#!/bin/bash

set -e

# print environment variables
# printenv

# Check if all commands are availables or install (on travis only)
sh "${BASH_SOURCE%/*}/ci_check_commands.sh"