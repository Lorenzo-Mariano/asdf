import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function Index() {
  const [students, setStudents] = useState<
    {
      id: number;
      first_name: string;
      last_name: string;
      age: number;
      course: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://192.168.126.184:3000/student");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log(data);

        setStudents(data);
      } catch (err) {
        console.log(err);
        setError("Error fetching students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Student List</Text>
      {error ? (
        <Text style={styles.message}>{error}</Text>
      ) : students.length === 0 ? (
        <Text style={styles.message}>No users found</Text>
      ) : (
        students.map((student) => (
          <View key={student.id} style={styles.item}>
            <Text style={styles.itemText}>
              {student.first_name} {student.last_name}
            </Text>
            <Text style={styles.itemText}>Age: {student.age}</Text>
            <Text style={styles.itemText}>Course: {student.course}</Text>
          </View>
        ))
      )}
      <View style={styles.linkContainer}>
        <Link href="/" style={styles.link}>
          Home
        </Link>
        <Link href="/create" style={styles.link}>
          Create Student
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  message: {
    fontSize: 16,
    color: "gray",
  },
  linkContainer: {
    marginTop: 20,
  },
  link: {
    fontSize: 18,
    color: "blue",
    marginBottom: 10,
  },
  item: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});
