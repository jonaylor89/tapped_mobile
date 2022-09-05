import React from 'react';
import { ImagePickerContext, useImagePicker } from '../useImagePicker';

export const ImagePickerProvider = ({ children }: { children: any }) => {
    const { imagePicker } = useImagePicker();

    const value = { imagePicker };

    // use a provider to pass down the value
    return <ImagePickerContext.Provider value={value}>{children}</ImagePickerContext.Provider>;
};

export default ImagePickerProvider;
