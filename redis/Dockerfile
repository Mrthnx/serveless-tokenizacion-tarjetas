# Usar la imagen oficial de Redis como base
FROM redis:latest

# Configuración opcional: Copiar un archivo de configuración personalizado (redis.conf) al contenedor
# COPY redis.conf /usr/local/etc/redis/redis.conf

# Exponer el puerto en el que Redis escucha
EXPOSE 6379

# Comando para iniciar Redis
CMD ["redis-server"]