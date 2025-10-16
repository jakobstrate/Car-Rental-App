import { useEffect, useState } from "react";
import { Dimensions, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ModalFilterProps {
    label: String;
    options: string[];
    value?: string | null;
    onSelect?: (value: string) => void;
}

const { height } = Dimensions.get("window");

const ModalFilter = (props: ModalFilterProps) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string | null>(props.value ?? null);

    useEffect(() => {
        setSelected(props.value ?? null);
    }, [props.value])

    const handleSelect = (option: string) => {
        setSelected((prev) => (prev === option ? null : option));
    };

    const handleApply = () => {
        props.onSelect?.(selected ?? null);
        setVisible(false);
    };

    return (
        <View style={styles.filterBtnCell}>
            <TouchableOpacity
                style={styles.filterBtn}
                onPress={() => setVisible(true)}
            >
                <Text style={styles.filterBtnTxt}>{props.value ? props.value : props.label}</Text>
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent={true}
                onRequestClose={() => setVisible(false)}
            >

                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setVisible(false)}
                >

                    <Pressable
                        style={styles.modalContainer}
                        onPress={(e) => e.stopPropagation()}
                    >

                        <Text style={styles.modalTitle}>{props.label}</Text>

                        <ScrollView
                            style={styles.optionsScrollView}
                            contentContainerStyle={styles.optionList}
                            showsVerticalScrollIndicator={true}
                        >
                            {props.options.map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.optionButton,
                                        selected === option && styles.optionButtonSelected,
                                    ]}
                                    onPress={() => handleSelect(option)}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            selected === option && styles.optionTextSelected
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setVisible(false)}
                            >
                                <Text style={styles.actionButtonText}>Close</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.applyButton}
                                onPress={() => handleApply()}
                            >
                                <Text style={styles.actionButtonText}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    filterBtnCell: {
        marginRight: 10,
    },
    filterBtn: {
        backgroundColor: '#007FFF',
        marginLeft: 10,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
        boxShadow: "0 -2px 0px #369AFF, 0 3px 2px rgba(0,0,0,0.25)",
    },
    filterBtnTxt: {
        color: '#fff',
        fontWeight: '600'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "80%",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        color: "#555",
    },
    optionsScrollView: {
        maxHeight: height / 2,
        flex: 0,
    },

    optionList: {
        paddingBottom: 12,
    },
    optionButton: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderRadius: 8,
        backgroundColor: "#F9F9F9",
        borderBottomColor: "#E0E0E0",
    },

    optionButtonSelected: {
        backgroundColor: "#007AFF33",
        borderColor: "#007AFF",
        borderWidth: 1,
    },
    optionText: {
        fontSize: 16,
    },
    optionTextSelected: {
        color: "#007AFF",
        fontWeight: "600",
    },

    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },
    closeButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#aaa",
    },
    applyButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#007AFF",
    },
    actionButtonText: {
        color: "#fff",
        fontWeight: "600",
    },
});
export default ModalFilter
