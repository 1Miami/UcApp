import { View, Text, StyleSheet, Image } from "react-native";

interface PostProps {
  title: string;
}

const Post = ({ title }: PostProps) => {
  return (
    <View style={styles.postContainer}>
      {/* Imagem principal da postagem */}
      <Image
        style={styles.postImage}
        source={require("../../assets/back.jpg")} // Imagem da postagem
      />
      {/* Título da postagem */}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginVertical: 15,
    width: "100%",
    alignItems: "center",
  },
  postImage: {
    width: "90%",
    height: 640,
    width: 400,
  },
  title: {
    fontSize: 18,
    color: "#f1f1f1",
    marginTop: 10,
  },
});

export default Post;
