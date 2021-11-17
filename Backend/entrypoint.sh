#!/bin/sh
set -e           # Stop on any error
npm run dbmigrate  # Run migrations
exec "$@"        # Run the command as the main container process
