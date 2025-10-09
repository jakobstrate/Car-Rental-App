import { StyleSheet } from "react-native";


export const detailsViewStyle = StyleSheet.create({
    detailsView: {
        height: 360,
        width: '90%',
        gap: 10,
    },
    basicCarInfoCards: {
        height: 100,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionTxt: {
        fontSize: 16,
    },
    specGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        gap: 8,
    },
});

export const specItemStyle = StyleSheet.create({
    specContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 1,
        borderColor: '#EAEAEA',

        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
    },
    valueTxt: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000ff',
    }
});

export const basicCarInfoCardStyle = StyleSheet.create({

    container: {
        height: 100,
        width: 100,
        backgroundColor: '#d9d9d956',
        borderRadius: 20,
        borderColor: '#9494947c',
        borderWidth: 1,
        paddingLeft: 8,
        paddingTop: 8,
    },
    typeTxt: {
        fontSize: 14,
    },
    valueTxt: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000ff',
    }
});

export const bottomBarContainerStyles = StyleSheet.create({ 
    bottomBar: {
        position: 'absolute',
        bottom: 10,
        width: '95%',
        alignItems: 'center',
        flexDirection: 'column',
        height: 175,
        justifyContent: 'space-between',
        paddingTop: 20,
        elevation: 15,
        backgroundColor: '#ffffffff',
        borderRadius: 10,
        borderColor: '#adadadff',
        borderWidth: 1,
        borderTopWidth: 0.7,
         
    },
});