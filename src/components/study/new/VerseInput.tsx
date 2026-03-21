import { useState } from "react";
import { X, Plus } from "lucide-react";
import type { BibleStudyVerse } from "#/types";
import { BIBLE_VERSIONS } from "#/data/bible/bible_versions";
import { useServerFn } from "@tanstack/react-start";
import { getBooks, getScripture } from "#/server/bible_api/getBooks";
import { useQuery } from "@tanstack/react-query";

interface VerseInputProps {
  verses: BibleStudyVerse[];
  onChange: (verses: BibleStudyVerse[]) => void;
}

export function VerseInput({ verses, onChange }: VerseInputProps) {
  const [selectedVersion, setSelectedVersion] = useState(BIBLE_VERSIONS[0].id);
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedVerseStart, setSelectedVerseStart] = useState("");
  const [selectedVerseEnd, setSelectedVerseEnd] = useState("");
  const [text, setText] = useState("");

  //server fn calls
  const getBooksTrigger = useServerFn(getBooks);
  const { data: fetchedBooks } = useQuery({
    queryKey: ["books", selectedVersion],
    queryFn: () =>
      getBooksTrigger({
        data: {
          version_id: selectedVersion,
        },
      }),
    enabled: !!selectedVersion,
  });

  const getPassageTrigger = useServerFn(getScripture);
  const { data: fetchedPassage } = useQuery({
    queryKey: [
      "books",
      {
        selectedVersion,
        selectedBook,
        selectedChapter,
        selectedVerseStart,
        selectedVerseEnd,
      },
    ],
    queryFn: () =>
      getPassageTrigger({
        data: {
          version_id: selectedVersion,
          book_id: selectedBook,
          chapter: Number(selectedChapter),
          verse_start: Number(selectedVerseStart),
          verse_end: Number(selectedVerseEnd),
        },
      }),
    enabled: !!(
      selectedVersion &&
      selectedBook &&
      selectedChapter &&
      selectedVerseStart
    ),
  });

  //get chapters for book
  const selectedBookData = fetchedBooks?.data.find(
    (b) => b.id === selectedBook,
  );
  const maxChapters = selectedBookData?.chapters?.length || 0;

  // Generate chapter options
  const chapterOptions = Array.from({ length: maxChapters }, (_, i) => i + 1);

  const selectedChapterData = selectedBookData?.chapters?.find(
    (ch) => ch.id === selectedChapter,
  );

  const maxVerses = selectedChapterData?.verses?.length || 0;
  // For verse count, derive from chapter data
  const verseOptions = Array.from({ length: maxVerses }, (_, i) => i + 1);

  const buildReference = () => {
    if (
      !selectedVersion ||
      !selectedBook ||
      !selectedChapter ||
      !selectedVerseStart
    )
      return "";
    const formattedBook = fetchedBooks?.data.find((b) => b.id === selectedBook);

    let ref = `${formattedBook?.title || selectedBook} ${selectedChapter}:${selectedVerseStart}`;
    if (selectedVerseEnd && selectedVerseEnd !== selectedVerseStart) {
      ref += `-${selectedVerseEnd}`;
    }
    return ref;
  };
  const buildVerseReference = (
    book: string,
    chapter: number,
    verseStart: number,
    verseEnd: number | null,
  ) => {
    if (!book || !chapter || !verseStart) return "";
    const formattedBook = fetchedBooks?.data.find((b) => b.id === book);
    let ref = `${formattedBook?.title || book} ${chapter}:${verseStart}`;
    if (verseEnd && verseEnd !== verseStart) {
      ref += `-${verseEnd}`;
    }
    return ref;
  };

  const addVerse = () => {
    const reference = buildReference();
    if (reference && fetchedPassage?.trim()) {
      onChange([
        ...verses,
        {
          id: Date.now().toString(),
          version: selectedVersion,
          book: selectedBook,
          chapter: Number(selectedChapter),
          verse_start: Number(selectedVerseStart),
          verse_end: Number(selectedVerseEnd),
          verse_text: fetchedPassage?.trim(),
        },
      ]);
      // Reset form
      setSelectedBook("");
      setSelectedChapter("");
      setSelectedVerseStart("");
      setSelectedVerseEnd("");
      setText("");
    }
  };

  const removeVerse = (id: string) => {
    onChange(verses.filter((v) => v.id !== id));
  };

  const handleVersionChange = (value: string) => {
    setSelectedVersion(Number(value));
    //get books for the version
    // console.log(fetchedBooks);
  };

  const handleBookChange = (value: string) => {
    setSelectedBook(value);
    setSelectedChapter("");
    setSelectedVerseStart("");
    setSelectedVerseEnd("");
  };

  const handleChapterChange = (value: string) => {
    setSelectedChapter(value);
    setSelectedVerseStart("");
    setSelectedVerseEnd("");
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {/* Scripture Reference Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <select
            value={selectedVersion}
            onChange={(e) => handleVersionChange(e.target.value)}
            className="px-4 py-2 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select Version</option>
            {BIBLE_VERSIONS.map((version) => (
              <option key={version.abbreviation} value={version.id}>
                {version.abbreviation}
              </option>
            ))}
          </select>
          <select
            disabled={!selectedVersion}
            value={selectedBook}
            onChange={(e) => handleBookChange(e.target.value)}
            className="px-4 py-2 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Select Book</option>
            {fetchedBooks &&
              fetchedBooks.data &&
              fetchedBooks.data.map((book) => (
                <option key={book.id} value={book.id}>
                  {book.title}
                </option>
              ))}
          </select>

          <select
            value={selectedChapter}
            onChange={(e) => handleChapterChange(e.target.value)}
            disabled={!selectedBook}
            className="px-4 py-2 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Chapter</option>
            {chapterOptions.map((chapter) => (
              <option key={chapter} value={chapter}>
                {chapter}
              </option>
            ))}
          </select>
          <select
            value={selectedVerseStart}
            onChange={(e) => setSelectedVerseStart(e.target.value)}
            disabled={!selectedChapter}
            className="px-4 py-2 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">Verse</option>
            {verseOptions.map((verse) => (
              <option key={verse} value={verse}>
                {verse}
              </option>
            ))}
          </select>
          <select
            value={selectedVerseEnd}
            onChange={(e) => setSelectedVerseEnd(e.target.value)}
            disabled={!selectedVerseStart}
            className="px-4 py-2 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">End (optional)</option>
            {verseOptions
              .filter((v) => v > Number(selectedVerseStart))
              .map((verse) => (
                <option key={verse} value={verse}>
                  {verse}
                </option>
              ))}
          </select>
        </div>

        {/* Current Reference Preview */}
        {buildReference() && (
          <div className="text-sm text-accent font-medium">
            Reference: {buildReference()} (
            {BIBLE_VERSIONS.find((v) => v.id === selectedVersion)?.abbreviation}
            )
          </div>
        )}

        {/* Verse Text Input */}
        <div className="flex gap-2">
          <input
            type="text"
            // value={text}
            value={fetchedPassage || text}
            disabled
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter verse text (e.g., For God so loved the world...)"
            className="flex-1 px-4 py-2 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={addVerse}
            disabled={
              !buildReference() || (!text.trim() && !fetchedPassage?.trim())
            }
            className="px-3 md:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {verses.length > 0 && (
        <div className="space-y-2">
          {verses.map((verse) => (
            <div
              key={verse.id}
              className="flex items-start gap-3 p-3 md:p-4 bg-secondary rounded-lg border-l-4 border-primary"
            >
              <div className="flex-1 space-y-1 min-w-0">
                <div className="text-xs md:text-sm text-accent">
                  {buildVerseReference(
                    verse.book,
                    verse.chapter,
                    verse.verse_start,
                    verse.verse_end,
                  )}
                </div>
                <div className="text-sm md:text-base text-foreground leading-relaxed wrap-break-word">
                  {verse.verse_text}
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeVerse(verse.id)}
                className="p-1 hover:bg-background rounded transition-colors shrink-0"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
