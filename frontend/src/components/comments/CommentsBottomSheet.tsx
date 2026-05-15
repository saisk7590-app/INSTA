import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../../theme';
import { getCommentsForThread, posts } from '../../services/feed';
import { Comment } from '../../types/social';
import { CommentInput } from './CommentInput';
import { CommentCard } from './CommentCard';
import { ReplyCard } from './ReplyCard';
import { EmptyCommentsState } from './EmptyCommentsState';

export type CommentsBottomSheetRef = {
  present: (threadId: string, title?: string) => void;
  dismiss: () => void;
};

type SheetState = {
  threadId: string;
  title: string;
  comments: Comment[];
};

export const CommentsBottomSheet = forwardRef<CommentsBottomSheetRef>(function CommentsBottomSheet(_, ref) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '75%', '95%'], []);
  const [state, setState] = useState<SheetState>({
    threadId: '',
    title: 'Comments',
    comments: [],
  });
  const [index, setIndex] = useState(-1);

  useImperativeHandle(ref, () => ({
    present: (threadId: string, title?: string) => {
      const post = posts.find((item) => item.id === threadId);
      setState({
        threadId,
        title: title ?? post?.userName ?? 'Comments',
        comments: getCommentsForThread(threadId),
      });
      setIndex(1);
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(1);
      });
    },
    dismiss: () => {
      bottomSheetRef.current?.close();
    },
  }), []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.55}
        pressBehavior="close"
      />
    ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose
      animateOnMount={false}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.handle}
      onClose={() => setIndex(-1)}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.header}>
        <Text style={styles.title}>{state.title}</Text>
        <Text style={styles.subtitle}>{state.comments.length} replies in this local thread</Text>
      </BottomSheetView>
      {state.comments.length === 0 ? (
        <BottomSheetView style={styles.emptyWrap}>
          <EmptyCommentsState />
        </BottomSheetView>
      ) : (
        <BottomSheetFlatList
          data={state.comments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View>
              <CommentCard comment={item} />
              {item.replies?.map((reply) => (
                <ReplyCard key={reply.id} reply={reply} />
              ))}
            </View>
          )}
        />
      )}
      <CommentInput />
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: 'rgba(10,12,18,0.98)',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  handle: {
    backgroundColor: colors.textMuted,
    width: 48,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    color: colors.text,
    textAlign: 'center',
    ...typography.heading,
  },
  subtitle: {
    marginTop: 4,
    color: colors.textSecondary,
    textAlign: 'center',
    ...typography.caption,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  emptyWrap: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
});
