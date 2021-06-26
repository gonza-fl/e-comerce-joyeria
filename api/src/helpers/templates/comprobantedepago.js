/* eslint-disable no-multi-str */
const comprobantedepago = '<!DOCTYPE HTML>\
        <html>\
        <head>\
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />\
        <link rel="preconnect" href="https://fonts.gstatic.com">\
        <link rel="preconnect" href="https://fonts.gstatic.com">\
        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet">\
        <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">\
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">\
        <style>\
        .flex{display: flex;justify-content: center;}\
        #imagen{margin: auto;}\
        body{padding: 0px;margin: 0px;font-family: "Great Vibes", "cursive";}\
        table,\
        th,\
        td {\
            padding: 10px;\
            border-bottom: 1px solid black;\
            border-collapse: collapse;\
        }\
        body{background-image: url("https://res.cloudinary.com/grupo6/image/upload/v1624587655/henry/corazones_oftln9.png");}\
        </style>\
    </head>\
    <body>\
        <div style="background-color: #FFC0F5;" class="flex">\
            <img id="imagen" src="https://res.cloudinary.com/grupo6/image/upload/v1624588050/henry/logo_vfwfhm.png" style="width: 300px;"/>\
        </div>\
        <div class="d-flex justify-content-center">\
        <table class="table w-75 text-center my-5" style="width: 90%; margin:auto;text-align: center;">\
            <thead>\
            <tr>\
                <th class="w-25" style="font-weight:600; font-size:16px; width: 25%;">PRODUCTO</th>\
                <th class="w-25" style="font-weight:600; font-size:16px; width: 25%;">CANTIDAD</th>\
                <th class="w-25" style="font-weight:600; font-size:16px; width: 25%;">PRECIO UNITARIO</th>\
            </tr>\
            </thead>\
            <tbody>\
                {{#each productos}}\
                    <tr>\
                        <td class="text-center col" style="font-size: 16px;">{{nameProducto}}</td>\
                        <td class="text-center col" style="font-size: 16px;">{{cantidad}}</td>\
                        <td class="text-center col" style="font-size: 16px;">{{precioUnitario}}</td>\
                    </tr>\
                {{/each}}\
            <tr>\
                <td style="font-weight: 600;font-size:16px;">TOTAL</td>\
                <td></td>\
                <td style="font-weight: 600;font-size:16px;">{{total}}</td>\
            </tr>\
            </tbody>\
        </table>\
        </div>\
        </body>\
        <footer>\
            <p style="margin-left: 20px; font-size: 14px;">Gracias {{name}} por tu compra!</p>\
            <p style="margin-left: 20px; font-size: 14px;">Numero de orden: {{orden}}</p>\
            <p style="margin-left: 20px; margin-bottom: 20px; font-size: 14px;">Copyright 2021</p>\
        </footer>\
    </body>\
    </html>';

module.exports = {
  comprobantedepago,
};
