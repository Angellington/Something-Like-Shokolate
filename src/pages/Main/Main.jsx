import Box from "@mui/material/Box";
import styles from "./Main.module.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, Typography } from "@mui/material";
import html2canvas from "html2canvas";


const Main = () => {
  const [cartBackground, setCartBackground] = useState("");
  const [write, setWrite] = useState("");
  const [stickersBox, setStickersInBox] = useState([]);

  // Fazer Download
const downloadBoxAsImage = () => {
  const box = document.querySelector(`.${styles.MessageBox}`); // seleciona o elemento
  if (!box) return;

  html2canvas(box, { useCORS: true }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "meu_cartao.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
};


  // Funçoes de imagem

  const images = import.meta.glob("/public/cartImage/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });
  const stickers = import.meta.glob("/public/stickers/*.{png,jpg,jpeg,svg}", {
    eager: true,
  });

  // Funções de Drag and Drop
  const [draggedSticker, setDraggedSticker] = useState(null);
  const handleDrop = (e) => {
    e.preventDefault();
    const stickerSrc = e.dataTransfer.getData("sticker");

    // posição relativa ao Box
    const boxRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boxRect.left;
    const y = e.clientY - boxRect.top;

    setStickersInBox((prev) => [
      ...prev,
      { src: stickerSrc, x, y, id: Date.now() },
    ]);
  };

  const handleDragStart = (e, sticker) => {
    e.dataTransfer.setData("sticker", sticker.default);
  };

  const startMove = (id, e) => {
    e.stopPropagation();
    const boxRect = e.currentTarget.parentElement.getBoundingClientRect(); // parent = MessageBox
    const offsetX =
      e.clientX - boxRect.left - stickersBox.find((s) => s.id === id).x;
    const offsetY =
      e.clientY - boxRect.top - stickersBox.find((s) => s.id === id).y;

    setDraggedSticker({ id, offsetX, offsetY });
  };

  const moveSticker = (e) => {
    if (!draggedSticker) return;

    const boxRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boxRect.left - draggedSticker.offsetX;
    const y = e.clientY - boxRect.top - draggedSticker.offsetY;

    setStickersInBox((prev) =>
      prev.map((sticker) =>
        sticker.id === draggedSticker.id ? { ...sticker, x, y } : sticker
      )
    );
  };

  const stopMove = () => setDraggedSticker(null);

  return (
    <Box className={styles.BoxMain}>
      {/* UPPPER MAGIC */}
      <Box
        sx={{ display: "flex", padding: 2, backgroundColor: "#efef23", gap: 2 }}
      >
        <Box className={styles.BoxSideMenu}>
          {Object.values(images).map((image, idx) => (
            <Avatar
              key={idx}
              src={image.default}
              alt={`Image ${idx + 1}`}
              className={styles.avatar}
              onClick={() => setCartBackground(`url(${image.default})`)}
            />
          ))}
        </Box>{" "}
        <Box className={styles.BoxCart}>
          <Box
            sx={{
              backgroundImage: cartBackground,
            }}
            className={styles.MessageBox}
            onDragOver={(e) => e.preventDefault()} // permite soltar dentro
            onDrop={handleDrop}
            onMouseMove={moveSticker}
            onMouseUp={stopMove}
          >
            <Typography className={styles.typographyBox}>{write}</Typography>
            {stickersBox.map((sticker) => (
              <img
                key={sticker.id}
                src={sticker.src}
                className={styles.stickerInsideBox}
                style={{
                  top: `${sticker.y}px`,
                  left: `${sticker.x}px`,
                }}
                onMouseDown={(e) => startMove(sticker.id, e)}
                draggable={false}
              />
            ))}
          </Box>
<Button 
  className={styles.personaButton} 
  onClick={downloadBoxAsImage}
>
  BAIXAR
</Button>
          
        </Box>
        <Box className={styles.BoxSideMenu}>
          {Object.values(stickers).map((sticker, idx) => (
            <Avatar
              key={idx}
              src={sticker.default}
              alt={`Sticker ${idx + 1}`}
              className={styles.avatar}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData("sticker", sticker.default)
              }
            />
          ))}
        </Box>
      </Box>
      {/* DOWN MAGIC  */}
      <Box sx={{ width: "60%", backgroundColor: "#a1a1a131" }}>
        <TextField
          name="card"
          multiline
          rows={3}
          sx={{ width: "100%" }}
          onChange={(e) => setWrite(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default Main;
