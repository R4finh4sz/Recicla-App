import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { ScrollView, Text, TextInput, View } from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import useDropdown from '@/contexts/common/Dropdown';

import Checkbox from '../Checkbox';
import ErrorText from '../ErrorText';
import Pressable from '../Pressable';

import { TOption } from './item';

export type options = {
  label: string;
  value: string;
};

type Props<TFieldValues extends FieldValues> = {
  options: TOption[];
  placeholder?: string;
  zIndex?: number;
  label?: string;
  editable?: boolean;
  searchable?: boolean;
  contextKey?: string;
  leftIcon?: React.ReactNode;
  multiple?: boolean;
  chevronColor?: string;
  showCheckboxes?: boolean;
} & UseControllerProps<TFieldValues>;

const Dropdown = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
  placeholder = 'Selecione uma opção',
  zIndex = 1,
  label,
  editable = true,
  searchable = false,
  disabled,
  contextKey,
  leftIcon,
  multiple = false,
  chevronColor = '#000000',
  showCheckboxes = false,
}: Props<TFieldValues>) => {
  const { dropDownKey, setDropDownKey } = useDropdown();

  const [enableLayoutAnimations, setEnableLayoutAnimations] = useState(false);
  const [searchText, setSearchText] = useState('');

  const dropdownKey = contextKey || name;
  const isOpen = dropDownKey === dropdownKey;

  useEffect(() => {
    const timeout = setTimeout(() => setEnableLayoutAnimations(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    setSearchText('');
  }, [isOpen]);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  const isMultipleMode = multiple || showCheckboxes;

  const hasValue = isMultipleMode
    ? Array.isArray(field.value) && field.value.length > 0
    : !!field.value;

  const toggleDropdown = () => {
    if (disabled || !editable) {
      return;
    }
    setDropDownKey(isOpen ? '' : dropdownKey);
  };

  const handleSelect = (value: string) => {
    if (isMultipleMode) {
      const currentValues = Array.isArray(field.value)
        ? (field.value as string[])
        : [];
      const valueIndex = currentValues.indexOf(value);

      if (valueIndex > -1) {
        const newValues = currentValues.filter((v: string) => v !== value);
        field.onChange(newValues);
      } else {
        field.onChange([...currentValues, value]);
      }
    } else {
      field.onChange(value);
      field.onBlur();
      setDropDownKey('');
    }
  };

  const isSelected = (value: string) => {
    if (isMultipleMode) {
      return (
        Array.isArray(field.value) && (field.value as string[]).includes(value)
      );
    }
    return field.value === value;
  };

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isOpen ? '180deg' : '0deg', {
          duration: 200,
        }),
      },
    ],
  }));

  const filteredOptions = useMemo(() => {
    if (!searchText) {
      return options;
    }

    const normalizeText = (str: string) =>
      str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    const normalizedSearch = normalizeText(searchText);

    return options.filter(option =>
      normalizeText(option.label).includes(normalizedSearch),
    );
  }, [options, searchText]);

  const visibleText = useMemo(() => {
    if (isMultipleMode) {
      const selectedValues = Array.isArray(field.value)
        ? (field.value as string[])
        : [];
      if (selectedValues.length === 0) {
        return placeholder;
      }
      const selectedLabels = options
        .filter(option => selectedValues.includes(option.value))
        .map(option => option.label);

      return selectedLabels.join(', ');
    }

    if (field.value) {
      const selectedOption = options.find(
        option => option.value === field.value,
      );
      return selectedOption?.label || placeholder;
    }
    return placeholder;
  }, [field.value, placeholder, options, isMultipleMode]);

  const layoutAnimation = enableLayoutAnimations ? LinearTransition : undefined;

  return (
    <Animated.View
      className="w-full gap-2"
      layout={layoutAnimation}
      style={{ zIndex }}
    >
      {label && (
        <Text className="font-regular text-base text-neutral-80">{label}</Text>
      )}

      {!isOpen && (
        <Pressable
          className={`min-h-[50px] w-full flex-row items-center justify-between rounded-xl border px-4 py-3 ${
            hasValue
              ? 'border-neutral-20 bg-white'
              : 'border-neutral-20 bg-white'
          }`}
          disabled={disabled || !editable}
          onPress={toggleDropdown}
        >
          {leftIcon && <View className="mr-2">{leftIcon}</View>}

          <Text
            className={`flex-1 font-light text-base ${
              hasValue ? 'text-neutral-80' : 'text-neutral-60'
            }`}
            numberOfLines={1}
          >
            {visibleText}
          </Text>

          <Ionicons color={chevronColor} name="chevron-down" size={20} />
        </Pressable>
      )}

      {isOpen && (
        <View className="w-full rounded-xl border border-neutral-20 bg-white px-4 py-3 shadow-sm">
          <Pressable
            className="mb-3 flex-row items-center justify-between"
            hitSlop={8}
            onPress={toggleDropdown}
          >
            <View className="flex-1 flex-row items-center">
              {leftIcon && <View className="mr-2">{leftIcon}</View>}

              <Text className="font-light text-base text-neutral-80">
                {placeholder}
              </Text>
            </View>

            <Animated.View style={rotationStyle}>
              <Ionicons color={chevronColor} name="chevron-up" size={20} />
            </Animated.View>
          </Pressable>

          {searchable && (
            <View className="mb-3">
              <TextInput
                className="rounded-lg border border-neutral-20 bg-white px-3 py-2 text-base text-neutral-100"
                placeholder="Pesquisar..."
                placeholderTextColor="#9CA3AF"
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          )}

          <ScrollView
            nestedScrollEnabled
            className="max-h-60"
            showsVerticalScrollIndicator={false}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map(item => {
                const onSelect = () => handleSelect(item.value);

                return (
                  <View
                    key={item.value}
                    className="w-full flex-row items-center gap-3 py-2.5"
                  >
                    {isMultipleMode && (
                      <Checkbox
                        checked={isSelected(item.value)}
                        onToggle={onSelect}
                      />
                    )}

                    <Pressable className="flex-1" onPress={onSelect}>
                      <Text
                        className={`font-light text-sm ${
                          isSelected(item.value)
                            ? 'text-neutral-80'
                            : 'text-neutral-80'
                        }`}
                        numberOfLines={2}
                      >
                        {item.label}
                      </Text>

                      {item.address && (
                        <Text
                          className="mt-1 font-light text-xs text-neutral-60"
                          numberOfLines={1}
                        >
                          {`${item.address.street}, ${item.address.number} - ${item.address.neighborhood}, ${item.address.city} - ${item.address.state}`}
                        </Text>
                      )}
                    </Pressable>
                  </View>
                );
              })
            ) : (
              <Text className="py-4 text-center text-sm text-neutral-60">
                Nenhuma opção encontrada
              </Text>
            )}
          </ScrollView>
        </View>
      )}

      <ErrorText text={error?.message} />
    </Animated.View>
  );
};

export default Dropdown;
