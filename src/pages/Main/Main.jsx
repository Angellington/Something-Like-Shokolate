import Box from "@mui/material/Box";
import styles from "./Main.module.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

const Main = () => {
  return (
    <Box className={styles.BoxMain}>
      { /* UPPPER MAGIC */}
      <Box sx={{ display: 'flex', padding: 2, backgroundColor: '#efef23' }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#efef23",
            height: "50%",
          }}
        >
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </Box>
        <Box className={styles.BoxCart}>
          Imagem
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            backgroundColor: "#efef23",
            height: "50%",
          }}
        >
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
          <Avatar />
        </Box>
      </Box>
      {/* DOWN MAGIC  */}
      <Box sx={{ width: '100%', backgroundColor: '#a1a1a131' }}>
        <TextField name="card" multiline rows={3} sx={{ width: '100%' }}/>
      </Box>
    </Box>
  );
};

export default Main;
