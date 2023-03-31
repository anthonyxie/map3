// Exports the style sheet for the project.

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  spread: {
    justifyContent: 'space-between',
    paddingTop: 20
  },
  static_map: {
    height: '35%',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 6
  },
  mapRecenter: {
    transform: [{ translateX: 140 }, { translateY: 290 }]
  },
  addsong: {
    marginLeft: 20,
    width: '90%',
    height: '65%',
    marginTop: 20
  },
  login: {
    marginLeft: 20,
    width: '90%',
    height: '100%',
    marginTop: 20
  },
  link: {
    fontStyle: 'italic',
    color: '#80CFA9',
  },
  input: {
    backgroundColor: '#DEDEDE',
    width: '100%',
    height: 44,
    marginBottom: 20,
    borderRadius: 6,
    paddingLeft: 10,
    fontFamily: 'Nunito-Regular'
  },
  inputlabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    marginBottom: 6
  },
  profileImage: {
    height: 150,
    width: 150,
    justifyContent: 'center',
  },
  profileImageView: {
    flex: 1,
  },
  cogView: {
    flex: 1,
    flexDirection: 'row',
    direction: 'rtl',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  cogIcon: {
    fontSize: 40,
    color: '#574B60'
  },
  profileView: {
    flex: 9,
    alignItems: 'center'
  },
  profileContent: {
    flex: 3,
    alignItems: 'center'
  },
  profileName: {
    fontFamily: 'Nunito-Medium',
    fontSize: '24',
    marginBottom: '10%',
  },
  profilePinsPlaced: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  musicIcon: {
    fontSize: 24,
    marginRight: 5,
    color: '#8BB494'
  },
  profilePinsPlacedText: {
    fontFamily: 'Nunito-Medium',
    fontSize: '24',
  },
  topPanel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'left',
    paddingHorizontal: '5%',
    marginTop: '3%',
    width: '100%',
  },
  backArrow: {
    fontSize: 40
  },
  settingsContentPanel: {
    flex: 9,
    padding: '5%'
  },
  profileImageWrapper: {
    flex: 1,
    alignSelf: 'center',
    marginBottom: '5%'
  },
  settingsImageView: {
    flex: 1,
  },
  settingsContent: {
    flex: 3,
  },
  editImage: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    height: 150,
    paddingTop: 55,
    backgroundColor: '#00000066'
  },
  logout: {
    backgroundColor: '#2B8C35',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginRight: '5%',
    alignSelf: 'flex-end'
  },
  submit: {
    backgroundColor: '#2B8C35',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitPin: {
    backgroundColor: '#2B8C35',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70
  },
  colorSlider: {
    width: '100%',
    height: 40,
    marginBottom: 20
  },
  passwordInputLabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    marginBottom: 6
  },
  reset: {
    backgroundColor: '#2B8C35',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'right'
  },
  thumb: {
    width: 20,
    height: 20,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  submitlabel: {
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default styles;