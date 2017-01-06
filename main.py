from flask import Flask, redirect, request
from pdb import set_trace
from PIL import Image

app = Flask(__name__)


@app.route("/")
def index():
    return redirect("/static/index.html")


@app.route("/handlepic", methods=["POST"])
def handle_pic():
    if request.files and "picfile" in request.files:
        img_ob = Image.open(request.files["picfile"])
        dim1, dim2 = img_ob.size
        dim1 = int(dim1 / 16)
        dim2 = int(dim2 / 16)
        print("resizing to: %d and %d" % (dim1, dim2))
        img_ob.resize((dim1, dim2), Image.NEAREST)
        img_ob.save("myfile.jpg")
        print("okay got this far in image processing the upload...")

    return "check the file directory in the server and what have you"


@app.route("/currentimage", methods=["GET"])
def current_image():
    fileob = open("myfile.jpg", "rb")
    data = fileob.read()
    return data

if __name__ == '__main__':
    app.run(debug=True)