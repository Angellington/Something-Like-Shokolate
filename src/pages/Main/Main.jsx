import Box from "@mui/material/Box";
import styles from "./Main.module.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

const Main = () => {
  return (
    <Box className={styles.BoxMain}>
      {/* UPPPER MAGIC */}
      <Box
        sx={{ display: "flex", padding: 2, backgroundColor: "#efef23", gap: 2 }}
      >
        <Box className={styles.BoxSideMenu}>
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
        </Box>
        <Box className={styles.BoxCart}>
          <Box>
            
          </Box>
        </Box>
        <Box className={styles.BoxSideMenu}>
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
          <Avatar className={styles.avatar} />
        </Box>
      </Box>
      {/* DOWN MAGIC  */}
      <Box sx={{ width: "60%", backgroundColor: "#a1a1a131" }}>
        <TextField name="card" multiline rows={3} sx={{ width: "100%" }} />
      </Box>
    </Box>
  );
};

export default Main;
