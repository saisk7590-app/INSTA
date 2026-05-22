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
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { spacing, typography, useTheme, useThemedStyles } from '../../theme';
import { Comment } from '../../types/social';
import { fetchPostComments, addPostComment } from '../../services/postService';
import { useAuth } from '../../hooks/useAuth';
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
  const { user } = useAuth();
  const { colors } = useTheme();
  const styles = useThemedStyles(stylesFactory);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%', '75%', '95%'], []);
  const [state, setState] = useState<SheetState>({
    threadId: '',
    title: 'Comments',
    comments: [],
  });
  const [index, setIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const handleAddComment = async (text: string) => {
    if (!user?.id || !state.threadId) return;
    const newComment = await addPostComment(state.threadId, user.id, text);
    if (newComment) {
      setState((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));
    }
  };

  useImperativeHandle(ref, () => ({
    present: (threadId: string, title?: string) => {
      setState({
        threadId,
        title: title ?? 'Comments',
        comments: [],
      });
      setLoading(true);
      setIndex(1);
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(1);
      });

      fetchPostComments(threadId)
        .then((data) => {
          setState((prev) => ({
            ...prev,
            comments: data,
          }));
        })
        .finally(() => setLoading(false));
    },
    dismiss: () => {
      bottomSheetRef.current?.close();
    },
  }), [user?.id]);

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
        <Text style={styles.subtitle}>{state.comments.length} comments</Text>
      </BottomSheetView>
      {loading ? (
        <BottomSheetView style={styles.emptyWrap}>
          <ActivityIndicator size="large" color={colors.accent} style={{ marginTop: spacing.xl }} />
        </BottomSheetView>
      ) : state.comments.length === 0 ? (
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
      <CommentInput onSubmit={handleAddComment} />
    </BottomSheet>
  );
});

const stylesFactory = (colors: any, gradients: any, themeMode: string) => StyleSheet.create({
  sheetBackground: {
    backgroundColor: themeMode === 'light' ? 'rgba(255,255,255,0.98)' : 'rgba(10,12,18,0.98)',
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
