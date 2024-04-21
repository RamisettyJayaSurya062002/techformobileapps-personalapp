import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';

// NavigationButtons component
const NavigationButtons = ({ isLoggedIn, navigateToMyCars, navigateToRepairs, navigateToInsurance, navigateToMaintenance, navigateToInspection, navigateToFuelLog, navigateToSettings }) => (
  <View style={styles.navigationButtons}>
    {isLoggedIn && (
      <>
        <TouchableOpacity style={styles.navigationButton} onPress={navigateToMyCars}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={navigateToMyCars}>
          <Text style={styles.buttonText}>My Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={navigateToRepairs}>
          <Text style={styles.buttonText}>Repairs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={navigateToInsurance}>
          <Text style={styles.buttonText}>Insurance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={navigateToMaintenance}>
          <Text style={styles.buttonText}>Maintenance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={navigateToInspection}>
          <Text style={styles.buttonText}>Inspection</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={navigateToFuelLog}>
          <Text style={styles.buttonText}>Fuel Log</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton} onPress={navigateToSettings}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigationButton}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </>
    )}
  </View>
);

// Main App component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: 'karthik',
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    carModel: 'Toyota Camry',
  });

  // Sample data for cars and repairs
  const carsData = [
    { id: 1, make: 'Toyota', model: 'Camry', year: 2020, mileage: 25000 },
    { id: 2, make: 'Honda', model: 'Accord', year: 2019, mileage: 30000 },
    // Add more car data as needed
  ];

  const repairsData = [
    { carId: 1, component: 'Brakes', repair: 'Replace brake pads', cost: 150 },
    { carId: 2, component: 'Engine', repair: 'Oil change', cost: 50 },
    // Add more repair data as needed
  ];

  const handleLogin = () => {
    // Check if the entered username and password match any registered user
    const user = registeredUsers.find(user => user.username === username && user.password === password);
    
    if (user) {
      setIsLoggedIn(true);
      // Clear input fields after successful login
      setUsername('');
      setPassword('');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleRegister = () => {
    // Perform new user registration and add user to the list
    const newUser = { username: newUsername, password: newPassword };
    setRegisteredUsers([...registeredUsers, newUser]);
    alert('User registered successfully!');
    setNewUsername('');
    setNewPassword('');
  };

  const handleCarSelection = (carId) => {
    const selected = carsData.find(car => car.id === carId);
    setSelectedCar(selected);
  };

  const renderLoginForm = () => (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderRegistrationForm = () => (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="New Username"
        value={newUsername}
        onChangeText={text => setNewUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCarList = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Car Information</Text>
      <FlatList
        data={carsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.carItem} onPress={() => handleCarSelection(item.id)}>
            <Text>{item.make} {item.model} ({item.year})</Text>
            <Text>Mileage: {item.mileage} miles</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  const renderVehicleHistory = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Vehicle History</Text>
      {selectedCar && (
        <View style={styles.infoBox}>
          <Text>Make: {selectedCar.make}</Text>
          <Text>Model: {selectedCar.model}</Text>
          <Text>Year: {selectedCar.year}</Text>
          <Text>Mileage: {selectedCar.mileage} miles</Text>
        </View>
      )}
    </View>
  );

  const renderAROverlay = () => (
    <Modal visible={showModal} animationType="slide">
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={() => setShowModal(false)}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>AR Overlay with Repairs</Text>
        <Text>Component: Brakes</Text>
        <Text>Repair: Replace brake pads</Text>
        <Text>Cost: $150</Text>
      </View>
    </Modal>
  );

  const renderDashboard = () => (
    <View style={styles.dashboard}>
      <Text style={styles.dashboardText}>Dashboard</Text>
      <View style={styles.dashboardItem}>
        <Text style={styles.label}>User Name:</Text>
        <Text>{userData.name}</Text>
      </View>
      <View style={styles.dashboardItem}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text>{userData.phoneNumber}</Text>
      </View>
      <View style={styles.dashboardItem}>
        <Text style={styles.label}>Address:</Text>
        <Text>{userData.address}</Text>
      </View>
      <View style={styles.dashboardItem}>
        <Text style={styles.label}>Car Model:</Text>
        <Text>{userData.carModel}</Text>
      </View>
    </View>
  );

  const navigateToMyCars = () => {
    alert('Navigate to My Cars screen');
  };

  const navigateToRepairs = () => {
    alert('Navigate to Repairs screen');
  };

  const navigateToInsurance = () => {
    alert('Navigate to Insurance screen');
  };

  const navigateToMaintenance = () => {
    alert('Navigate to Maintenance screen');
  };

  const navigateToInspection = () => {
    alert('Navigate to Vehicle Inspection screen');
  };

  const navigateToFuelLog = () => {
    alert('Navigate to Fuel Log screen');
  };

  const navigateToSettings = () => {
    alert('Navigate to Settings screen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Auto Buddy</Text>
      <NavigationButtons
        isLoggedIn={isLoggedIn}
        navigateToMyCars={navigateToMyCars}
        navigateToRepairs={navigateToRepairs}
        navigateToInsurance={navigateToInsurance}
        navigateToMaintenance={navigateToMaintenance}
        navigateToInspection={navigateToInspection}
        navigateToFuelLog={navigateToFuelLog}
        navigateToSettings={navigateToSettings}
      />
      {!isLoggedIn ? (
        <>
          <Text style={styles.sectionTitle}>Login</Text>
          {renderLoginForm()}
          <Text style={styles.sectionTitle}>New User Registration</Text>
          {renderRegistrationForm()}
        </>
      ) : (
        <>
          <Text style={styles.loggedInText}>
            Welcome, {isLoggedIn ? username : newUsername}!
          </Text>

          {renderDashboard()}
          {renderCarList()}
          {renderVehicleHistory()}
          <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
            <Text style={styles.buttonText}>View AR Overlay with Repairs</Text>
          </TouchableOpacity>
          {renderAROverlay()}
        </>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loggedInText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  section: {
    marginTop: 20,
  },
  carItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  infoBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  dashboard: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dashboardText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dashboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  navigationButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
});

export default App;
