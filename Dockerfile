FROM oven/bun:latest

RUN apt-get update && apt-get install -y \
    curl \
    git \
    ffmpeg \
    libwebp-dev \
    ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_25.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN node -v && npm -v && bun -v

RUN git clone https://github.com/astrox11/Whatsaly /root/Whatsaly

WORKDIR /root/Whatsaly

RUN bun install

EXPOSE 3000 4321

CMD ["sh", "-c", "bun start"]
