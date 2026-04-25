
FROM python:3.10-slim

# Системные зависимости Kivy: SDL2, OpenGL (Mesa), X11, multitouch
RUN apt-get update && apt-get install -y --no-install-recommends \
        libgl1 \
        libgl1-mesa-dri \
        libgles2 \
        libsdl2-2.0-0 \
        libsdl2-image-2.0-0 \
        libsdl2-mixer-2.0-0 \
        libsdl2-ttf-2.0-0 \
        libmtdev1 \
        libxkbcommon0 \
        xclip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ ./src/

ENV PYTHONPATH=/app/src
# Программный рендерер Mesa — не требует GPU/DRM в контейнере
ENV LIBGL_ALWAYS_SOFTWARE=1

CMD ["python", "src/main.py"]
