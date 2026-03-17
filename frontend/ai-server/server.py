from fastapi import FastAPI, UploadFile, File
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from rembg import remove, new_session
from PIL import Image, ImageFilter
import numpy as np
import io
import cv2
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Best quality model
session = new_session("isnet-general-use")


@app.get("/")
def home():
    return {"message": "AI Server Running"}


# -----------------------------
# BACKGROUND REMOVER (SHARP)
# -----------------------------

@app.post("/remove-bg")
async def remove_bg(file: UploadFile = File(...)):

    input_bytes = await file.read()

    output = remove(input_bytes, session=session)

    img = Image.open(io.BytesIO(output)).convert("RGBA")

    data = np.array(img)

    alpha = data[:, :, 3]

    # hard threshold to remove halo
    alpha[alpha < 120] = 0
    alpha[alpha >= 120] = 255

    data[:, :, 3] = alpha

    cleaned = Image.fromarray(data)

    buf = io.BytesIO()
    cleaned.save(buf, format="PNG")

    return Response(buf.getvalue(), media_type="image/png")

# -----------------------------
# IMAGE ENHANCER
# -----------------------------

@app.post("/enhance")
async def enhance(file: UploadFile = File(...)):

    contents = await file.read()

    img = Image.open(io.BytesIO(contents)).convert("RGB")

    w, h = img.size

    enhanced = img.resize((w*2, h*2), Image.LANCZOS)

    buf = io.BytesIO()
    enhanced.save(buf, format="PNG")

    return Response(buf.getvalue(), media_type="image/png")


# -----------------------------
# SKETCH
# -----------------------------

@app.post("/sketch")
async def sketch(file: UploadFile = File(...)):

    contents = await file.read()

    nparr = np.frombuffer(contents, np.uint8)

    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # invert
    inv = 255 - gray

    # blur
    blur = cv2.GaussianBlur(inv,(31,31),0)

    # dodge blend (pencil effect)
    sketch = cv2.divide(gray,255-blur,scale=235)

    _,buffer = cv2.imencode(".png",sketch)

    return Response(buffer.tobytes(),media_type="image/png")