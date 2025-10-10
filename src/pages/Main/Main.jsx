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
  const [textInput, setTextInput] = useState("");
  const [stickersBox, setStickersInBox] = useState([]);
  const [textsBox, setTextsInBox] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [editingTextId, setEditingTextId] = useState(null);
  const [editTextContent, setEditTextContent] = useState("");

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

  // Funções de Drag and Drop para stickers
  const [draggedSticker, setDraggedSticker] = useState(null);
  const [draggedText, setDraggedText] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const stickerSrc = e.dataTransfer.getData("sticker");
    const textContent = e.dataTransfer.getData("text");

    const boxRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boxRect.left;
    const y = e.clientY - boxRect.top;

    if (stickerSrc) {
      playPut();
      setStickersInBox((prev) => [
        ...prev,
        { src: stickerSrc, x, y, id: Date.now() },
      ]);
    } else if (textContent) {
      playPut();
      setTextsInBox((prev) => [
        ...prev,
        {
          content: textContent,
          x,
          y,
          id: Date.now(),
          fontSize: 30,
          color: "#000000",
        },
      ]);
    }
  };

  // Movimento para stickers
  const startMoveSticker = (id, e) => {
    e.stopPropagation();
    const boxRect = e.currentTarget.parentElement.getBoundingClientRect();
    const sticker = stickersBox.find((s) => s.id === id);
    const offsetX = e.clientX - boxRect.left - sticker.x;
    const offsetY = e.clientY - boxRect.top - sticker.y;

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

  // Movimento para textos
  const startMoveText = (id, e) => {
    e.stopPropagation();
    const boxRect = e.currentTarget.parentElement.getBoundingClientRect();
    const text = textsBox.find((t) => t.id === id);
    const offsetX = e.clientX - boxRect.left - text.x;
    const offsetY = e.clientY - boxRect.top - text.y;

    setDraggedText({ id, offsetX, offsetY });
  };

  const moveText = (e) => {
    if (!draggedText) return;

    const boxRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boxRect.left - draggedText.offsetX;
    const y = e.clientY - boxRect.top - draggedText.offsetY;

    setTextsInBox((prev) =>
      prev.map((text) =>
        text.id === draggedText.id ? { ...text, x, y } : text
      )
    );
  };

  const stopMove = () => {
    setDraggedSticker(null);
    setDraggedText(null);
  };

  // Funções para textos
  const addText = () => {
    if (textInput.trim()) {
      setTextsInBox((prev) => [
        ...prev,
        {
          content: textInput,
          x: 50,
          y: 50,
          id: Date.now(),
          fontSize: 30,
          color: "#000000",
        },
      ]);
      setTextInput("");
    }
  };

  const saveEditText = () => {
    setTextsInBox((prev) =>
      prev.map((text) =>
        text.id === editingTextId ? { ...text, content: editTextContent } : text
      )
    );
    setEditingTextId(null);
    setEditTextContent("");
  };

  const cancelEditText = () => {
    setEditingTextId(null);
    setEditTextContent("");
  };

  const deleteText = (id) => {
    setTextsInBox((prev) => prev.filter((text) => text.id !== id));
  };

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

      {/* UPPER MAGIC */}
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
        </Box>

        <Box className={styles.BoxCart}>
          <Box
            sx={{
              backgroundImage: cartBackground,
            }}
            className={styles.MessageBox}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onMouseMove={(e) => {
              moveSticker(e);
              moveText(e);
            }}
            onMouseUp={stopMove}
            onMouseLeave={stopMove}
          >
            {/* Textos na box */}
            {textsBox.map((text) => (
              <div
                key={text.id}
                className={styles.textInsideBox}
                style={{
                  position: "absolute",
                  top: `${text.y}px`,
                  left: `${text.x}px`,
                  fontSize: `${text.fontSize}px`,
                  color: text.color,
                  cursor: "move",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  minWidth: "100px",
                  minHeight: "20px",
                }}
                onMouseDown={(e) => startMoveText(text.id, e)}
                onDoubleClick={() => {
                  setEditingTextId(text.id);
                  setEditTextContent(text.content);
                }}
              >
                {editingTextId === text.id ? (
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <TextField
                      value={editTextContent}
                      onChange={(e) => setEditTextContent(e.target.value)}
                      size="small"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveEditText();
                        } else if (e.key === "Escape") {
                          cancelEditText();
                        }
                      }}
                      onBlur={saveEditText}
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                ) : (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography
                      sx={{
                        fontSize: `${text.fontSize}px`,
                        color: text.color,
                        flexGrow: 1,
                        textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                        fontFamily: "Birthstone",
                      }}
                    >
                      {text.content}
                    </Typography>
                  </Box>
                )}
              </div>
            ))}

            {/* Stickers na box */}
            {stickersBox.map((sticker) => (
              <img
                key={sticker.id}
                src={sticker.src}
                className={styles.stickerInsideBox}
                style={{
                  top: `${sticker.y}px`,
                  left: `${sticker.x}px`,
                }}
                onMouseDown={(e) => startMoveSticker(sticker.id, e)}
                draggable={false}
              />
            ))}
          </Box>
        </Box>

        <Box className={styles.BoxSideMenu}>
          {/* Stickers */}
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

      {/* DOWN MAGIC - Área de texto */}
      <Box className={styles.cardBox} sx={{ p: 2 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <TextField
            label="Digite seu texto"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            multiline
            rows={2}
            sx={{ flexGrow: 1 }}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                addText();
              }
            }}
          />
          <Button
            variant="contained"
            onClick={addText}
            disabled={!textInput.trim()}
          >
            Adicionar Texto
          </Button>
          <Button className={styles.personaButton} onClick={downloadBoxAsImage}>
            BAIXAR
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
