import Box from "@mui/material/Box";
import styles from "./Main.module.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import html2canvas from "html2canvas";
import useSound from "use-sound";
// sounds
import changeBgSound from "../../assets/sounds/setBackground.wav";
import putSound from "../../assets/sounds/put.wav";
import getSound from "../../assets/sounds/get.wav";
import persona3 from "../../assets/sounds/1-16. Color Your Night.mp3";
// animations
import sparkle from "../../assets/animations/sparkle.gif";

const Main = () => {
  const [cartBackground, setCartBackground] = useState("");
  const [write, setWrite] = useState("");
  const [stickersBox, setStickersInBox] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const [playPersona] = useSound(persona3, {
    volume: 0.3,
    interrupt: true,
  });

  // sounds
  const [playChangeBg] = useSound(changeBgSound, {
    volume: 0.6,
    interrupt: true,
  });

  const [playGet] = useSound(getSound, {
    volume: 0.6,
    interrupt: true,
  });

  const [playPut] = useSound(putSound, {
    volume: 0.6,
    interrupt: true,
  });

  // Fazer Download
  const downloadBoxAsImage = () => {
    const box = document.querySelector(`.${styles.MessageBox}`);
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
    playPut();
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





  const handleAvatarClick = (image, idx) => {
    setCartBackground(`url(${image.default})`);
    playChangeBg();
    setActiveIndex(idx);
    setTimeout(() => setActiveIndex(null), 300);
  };

  useEffect(() => {
    playPersona();
  }, [playPersona]);

  return (
    <Box className={styles.BoxMain}>
      <Box className={styles.redStripe}></Box>

      {/* UPPPER MAGIC */}
      <Box sx={{ display: "flex", padding: 2, gap: 2 }}>
        <Box className={styles.BoxSideMenu}>
          {Object.values(images).map((image, idx) => (
            <div key={idx} className={styles.avatarWrapper}>
              <Avatar
                src={image.default}
                alt={`Image ${idx + 1}`}
                className={styles.avatar}
                onClick={() => handleAvatarClick(image, idx)}
              />
              {activeIndex === idx && (
                <img
                  src={sparkle}
                  alt="sparkle"
                  className={styles.sparkleGif}
                />
              )}
            </div>
          ))}
        </Box>{" "}
        <Box className={styles.BoxCart}>
          <Box
            sx={{
              backgroundImage: cartBackground,
            }}
            className={styles.MessageBox}
            onDragOver={(e) => e.preventDefault()} 
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
                onMouseDown={(e) => {
                  startMove(sticker.id, e);
                }}
                draggable={false}
              />
            ))}
          </Box>
          <Button className={styles.personaButton} onClick={downloadBoxAsImage}>
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
              onDragStart={(e) => {
                playGet();
                e.dataTransfer.setData("sticker", sticker.default);
              }}
            />
          ))}
        </Box>
      </Box>
      {/* DOWN MAGIC  */}
      <Box className={styles.cardBox}>
        <TextField
          name="card"
          multiline
          rows={3}
          onChange={(e) => setWrite(e.target.value)}
        />
      </Box>
    </Box>
  );
};

export default Main;
