import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ModalFilterProps {
    label: String;
    options: string[];
    onSelect?: (value: string) => void;
}

const ModalFilter = (props: ModalFilterProps) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelected((prev) => (prev === option ? null : option));
    };

    const handleApply = () => {
        if (props.onSelect) {
            props.onSelect(selected);
        }
        setVisible(false);
    };

    return (
        <View style={styles.filterBtnCell}>
            <TouchableOpacity
                style={styles.filterBtn}
                onPress={() => setVisible(true)}
            >
                <Text>{selected ? selected : props.label}</Text>
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

                        <View style={styles.optionList}>
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

                        </View>

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
        backgroundColor: "#e2e2e2",
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 15,
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

    optionList: {
        marginBottom: 20,
    },
    optionButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        marginBottom: 8,
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
