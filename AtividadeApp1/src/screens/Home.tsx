import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Post from "../components/Post";
import Footer from "../components/Footer";

const InstagramPost = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.userIcon}
          source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} // Ícone do usuário
        />
        <Text style={styles.userName}>@usuario</Text>
      </View>

      <Post title="Foto que Editei no Photoshop" />

      <View style={styles.interactions}>
        <Text style={styles.likes}>100 curtidas</Text>
        <Text style={styles.comments}>Comentários:</Text>
        <Text style={styles.comment}>@usuario1: Ótima postagem!</Text>
        <Text style={styles.comment}>@usuario2: Concordo!</Text>
      </View>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#252525",
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    width: "100%",
    backgroundColor: "#333",
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userName: {
    color: "#f1f1f1",
    fontSize: 18,
    marginLeft: 10,
  },
  interactions: {
    width: "90%",
    marginVertical: 10,
  },
  likes: {
    paddingBottom: 10,
    paddingLeft: 650,
    color: "#f1f1f1",
    fontSize: 18,
    marginBottom: 5,
  },
  comments: {
    paddingLeft: 650,
    color: "#f1f1f1",
    fontSize: 18,
    marginBottom: 5,
  },
  comment: {
    paddingLeft: 650,
    color: "#f1f1f1",
    fontSize: 16,
    marginBottom: 3,
  },
});

export default InstagramPost;
