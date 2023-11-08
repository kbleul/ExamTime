import React from 'react';
import CustomeTextInput from '../Atoms/TextInput';

interface NameInputProps {
    fullName: string;
    setFullName: (text: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ fullName, setFullName }) => {
    return (
        <CustomeTextInput
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
        />

    );
};

export default NameInput;