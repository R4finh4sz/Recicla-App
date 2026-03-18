import { Text, View } from 'react-native';

import { DownloadIcon, EditIcon } from '@/assets/icons';
import Pressable from '@/components/ui/Pressable';

type DocumentItemProps = {
  documentName: string;
  onDownload: () => void;
  onEdit: () => void;
  backgroundColor?: string;
  color?: string;
};

const DocumentItem = ({
  documentName,
  onDownload,
  onEdit,
  backgroundColor = '#1C1C1C',
  color = '#FFFFFF',
}: DocumentItemProps) => {
  return (
    <View
      className="mb-3 flex-row items-center justify-between rounded-lg p-4"
      style={{ backgroundColor }}
    >
      <Text className="font-inter_regular flex-1 text-sm" style={{ color }}>
        {documentName}
      </Text>

      <View className="flex-row gap-3">
        <Pressable onPress={onDownload}>
          <DownloadIcon color="#4CAF50" height={20} width={20} />
        </Pressable>

        <Pressable onPress={onEdit}>
          <EditIcon />
        </Pressable>
      </View>
    </View>
  );
};

export default DocumentItem;
