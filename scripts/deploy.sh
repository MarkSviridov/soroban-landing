#!/usr/bin/env bash
# Выкладка сайта на сервер (nginx отдаёт статику из /var/www/soroban-landing).
#
#   scripts/deploy.sh            сборка → резервная копия → новая версия рядом → подмена
#   scripts/deploy.sh rollback   вернуть предыдущую версию
#
# Вход на сервер — по SSH-ключу (~/.ssh/id_ed25519), пароль не нужен.
# Старые файлы не удаляются, как при ручной загрузке поверх: новая версия
# собирается из копии текущей, поверх которой распаковывается dist/.
set -euo pipefail

SERVER="${SERVER:-root@109.122.27.34}"
ROOT=/var/www/soroban-landing
cd "$(dirname "$0")/.."

if [ "${1:-}" = "rollback" ]; then
  ssh "$SERVER" "set -e; test -d $ROOT.prev; mv $ROOT $ROOT.failed-\$(date +%Y%m%d-%H%M%S); mv $ROOT.prev $ROOT; echo 'откат выполнен'"
  exit 0
fi

npm run build
# Временные копии песочницы Claude Code (*.sb-*) в сборку попасть не должны.
find dist -name '*.sb-*' -delete

STAMP=$(date +%Y%m%d-%H%M%S)

echo "1/3 резервная копия и подготовка новой версии на сервере"
ssh "$SERVER" "set -e; mkdir -p /root/backups; tar czf /root/backups/soroban-landing-$STAMP.tar.gz -C /var/www soroban-landing; rm -rf $ROOT.next; cp -a $ROOT $ROOT.next"

echo "2/3 загрузка файлов"
# COPYFILE_DISABLE и --no-xattrs: без служебных файлов macOS (._*) в архиве.
COPYFILE_DISABLE=1 tar --no-xattrs --no-mac-metadata -czf - -C dist . |
  ssh "$SERVER" "tar xzf - -C $ROOT.next && chown -R www-data:www-data $ROOT.next"

echo "3/3 подмена"
ssh "$SERVER" "set -e; rm -rf $ROOT.prev; mv $ROOT $ROOT.prev; mv $ROOT.next $ROOT"

echo "выложено: $STAMP"
echo "резервная копия: /root/backups/soroban-landing-$STAMP.tar.gz"
echo "откат: scripts/deploy.sh rollback"
