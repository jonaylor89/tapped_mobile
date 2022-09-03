
import { useContext, createContext } from 'react';
import { ImageRepository } from '../data/image_repository';
import { ExpoImageImpl } from '../data/prod/expo_image_impl';

// TODO - Abstract this out a bit more?
const imagePicker = new ExpoImageImpl()

export const ImagePickerContext = createContext<{
    imagePicker: ImageRepository,
}>({ imagePicker });

// export the useStorage hook
export const useImagePicker = () => {
    return useContext(ImagePickerContext);
};