import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1647',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24
  },
  contentLight: {
    width: '100%',
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#243189',
    position: "relative"
  },
  textLight: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#DDE3F0'
  },
  contentSwitch: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8
  },
  statusLight: {
    fontSize: 24,
    textTransform: 'uppercase'  
  },
  statusOn: {
    color: '#32BD50'
  },
  statusOff: {
    color: '#DDE3F0',
    opacity: 0.6
  },
  boxLight: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#243189',
    opacity: 0.5,
  },
  boxRed: {
    backgroundColor: '#E51C44',
    opacity: 1,
  },
  boxGreen: {
    backgroundColor: '#32BD50',
    opacity: 1,
  },
  content: {
    width: '100%',
    marginBottom: 24
  },
  textContent: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#DDE3F0'
  },
  contentDht: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8
  }, 
  contentResults: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#ABB1CC',
    fontWeight: '600'
  },
  textResults: {
    fontWeight: 'bold',
    color: '#DDE3F0',
    fontSize: 24,
    marginTop: 4
  },
  buttonRefresh: {
    width: 56,
    height: 56,
    backgroundColor: '#E51C44',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  separator: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#1D2766',
    marginBottom: 16
  }
});