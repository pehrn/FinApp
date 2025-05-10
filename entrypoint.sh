#!/bin/bash
set -e

echo "Waiting for PostgreSQL..."

until pg_isready -h "$POSTGRES_SERVER" -p "$POSTGRES_PORT" -U "$POSTGRES_USER"; do
  sleep 1
done

echo "PostgreSQL is up - running the application"
exec dotnet FinApp.Api.dll
