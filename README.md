# barassistant-ha
Simple Vuetify3 based readonly UI for [Bar Assistant](https://github.com/karlomikus/bar-assistant) that can be used as an embedded dashboard in [Home Assistant](https://www.home-assistant.io).

![Updated Screenshot of the UI.](doc/screenshot.png)


## Building

Collect your Bar Assistant URL, generate a readonly API token, find the ID of your bar, and the ID of a collection that you use to track your favorite cocktails.

```
docker build -t barassistant-ha:dev --build-arg API_URL=SITE_URL/bar/api --build-arg API_TOKEN=  --build-arg BAR_ID=1 --build-arg COLLECTION_ID=1 .
```

You can combine barassistant-ha with your Bar Assistant `docker-compose.yml` and `nginx.conf` and have this bar specific readonly frontend come up within the same docker-compose stack.  
The new instance will be available at `SITE_URL/bar/ha/`.

### docker-compose.yml
```
  barassistant-ha:
    image: barassistant-ha:dev
    restart: unless-stopped
    depends_on:
      - bar-assistant
      - meilisearch
    ports:
      - 8081:8081
```

### nginx.conf
```
    location ^~ /bar/ha/ {
        proxy_pass http://barassistant-ha:8081/;
    }
```
