import type { ViewStyle, SectionListProps, SectionListData } from 'react-native';
import type { scrollEfficiencyFunctions } from './defaultFunctions';

interface ItemObj {
  title: string;
  key?: string | number;
}
export type ItemType = string | ItemObj;

export interface SectionItem {
  data: ItemType;
  key: string;
}

type SelectIndexMethods = 'drag' | 'press';
export interface SelectIndexCallback {
  (selection: { index: number; item: string; method: SelectIndexMethods }): void;
}

export type ScrollEfficiencyFunction = (containerHeight: number, listHeight: number) => number;

// ============= Main component =============
// TODO: allow ref, keyExtractor?, onScrollToIndexFailed.
export interface IndexedSectionListProps
  extends Omit<
    SectionListProps<SectionItem>,
    'ref' | 'sections' | 'keyExtractor' | 'onScrollToIndexFailed'
  > {
  /** The items of the list, either strings or objects with titles. */
  items: ItemType[];
  /**
   * A methods that returns a section's properties
   * (see [Section Properties](https://reactnative.dev/docs/sectionlist#type-definitions)).
   */
  getSectionProps?: (
    title: string,
    unsortedData: SectionItem[]
  ) => SectionListData<SectionItem>;
  /** The height if an item in the index list (must be a constant). defaults to 25px. */
  indexItemHeight?: number;
  /** The method of the scroll (the correlation of a drag movement and the scroll). default is "revered". */
  scrollEfficiency?: keyof typeof scrollEfficiencyFunctions | ScrollEfficiencyFunction | null;
  /** The style of the view that contains both the section list and the index. */
  wrapperStyle?: ViewStyle;
  /** The style of the view that contains the index list. */
  indexWrapperStyle?: ViewStyle;
}

// =========== Section components ===========
export interface SectionHeaderProps {
  title: string;
}
export interface ListItemProps {
  item: { data: ItemType; key: string };
}

// ============ Index components ============
export interface IndexListProps {
  indexes: string[];
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  scrollEfficiency: ScrollEfficiencyFunction;
  wrapperStyle?: ViewStyle;
}
export interface IndexItemProps {
  index: number;
  item: string;
  onSelectIndex: SelectIndexCallback;
  indexItemHeight: number;
  style?: ViewStyle;
}
