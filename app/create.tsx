import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Link } from "expo-router";
import React, { useState } from "react";

export default function CreateStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState<number>();

  async function addStudent() {
    const studentData = { firstName, lastName, course, age };

    try {
      const response = await fetch("http://192.168.126.184:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      }).then((res) => res.json());
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Student</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Course"
        value={course}
        onChangeText={setCourse}
      />

      <TextInput
        style={styles.input}
        placeholder="Age"
        value={age ? age.toString() : ""}
        onChangeText={(value) => setAge(Number(value))}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={addStudent}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Link href="/" style={styles.link}>
        Back to Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  link: {
    padding: 20,
    fontSize: 16,
    color: "blue",
    textAlign: "center",
  },
});
