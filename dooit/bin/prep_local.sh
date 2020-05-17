#!/bin/bash

bundle check || bundle install

bundle exec rake db:drop \
                 db:create \
                 db:structure:load \
                 db:migrate \
                 db:structure:dump 