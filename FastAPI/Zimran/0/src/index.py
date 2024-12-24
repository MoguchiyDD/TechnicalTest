# GRIAN | МогучийДД (MoguchiyDD)
# https://github.com/MoguchiyDD/TechnicalTest/


from fastapi import FastAPI
from router.text import router as text_router


app = FastAPI()
app.include_router(text_router, prefix="/api/text", tags=["text"])
