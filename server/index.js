const express = require('express');
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const server = http.createServer(app);
//serveri oluşturuyor ve socket.io dan 3000 portuna gelecek post ve get requestlerinin sorun çıkrmaması için
//permissionlarını veriyoruz (exeption oluşturuyoruz)
const io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        merhods: ["GET", "POST"],
    },
});
//socketio'da aşşağıdaki "connection" bağlantı türü 
//gerçekleşip gerçekleşmediğini dinliyoruz
io.on("connection", (socket) => {
    console.log(`Kullanıcı Bağlandı ${socket.id}`);

    socket.on("Odaya_katil", (data) =>{
        socket.join(data);
        console.log(`${socket.id}'ID li kullanıcı ${data} odasına katıldı ` );
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data);
    })
    socket.on("disconnect", () => {
        console.log("Kullanıcı Çıktı", socket.id);
    });

});
   
//serverin çalışıp çalışmadığını console logu aracılığı ile check ediyoruz 
server.listen(3001, () => {
    console.log("SERVER ÇALIŞIYOR")
});