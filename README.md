# barassistant-ha
Simple Vuetify3 based UI for Bar Assistant that can be embedded in to Home Assistant.

![Updated Screenshot of the UI.](doc/screenshot.png)



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
    location /ha {
        proxy_pass http://barassistant-ha:8081/;
    }
```