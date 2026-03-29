import { createBibleStudy } from "#/server/bible_study/createBibleStudy";
import { useCreateBibleStudyStore } from "#/store/useCreateBibleStudyStore";
import Button from "#/ui/button/Button";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { Globe, LoaderCircle, Lock, Send, Users } from "lucide-react";
import { useEffect, useState } from "react";
import BibleStudyContentEditor from "./BibleStudyContentEditor";
import { VerseInput } from "./VerseInput";
import { MediaInput } from "./MediaInput";
import { CollaboratorInput } from "./CollaboratorInput";
import { updateBibleStudy } from "#/server/bible_study/updateBibleStudy";
import { addBibleVerses } from "#/server/bible_verses/addBibleVerses";
import { clearBibleVerses } from "#/server/bible_verses/clearBibleVerses";
import { addBibleStudyCollaborators } from "#/server/bible_study_collaborators/addBibleStudyCollaborators";
import { clearBibleStudyCollaborators } from "#/server/bible_study_collaborators/clearBibleStudyCollaborators";

export function CreateStudyPage({
  type = "new",
  study_id,
}: {
  type?: "new" | "edit";
  study_id?: string;
}) {
  // utils
  const navigate = useNavigate();

  // store
  const { isAuthenticated, user } = useRouteContext({ from: "__root__" });
  const content = useCreateBibleStudyStore((s) => s.content);
  const setContent = useCreateBibleStudyStore((s) => s.setContent);
  const title = useCreateBibleStudyStore((s) => s.title);
  const setTitle = useCreateBibleStudyStore((s) => s.setTitle);
  const topic = useCreateBibleStudyStore((s) => s.topic);
  const setTopic = useCreateBibleStudyStore((s) => s.setTopic);
  const description = useCreateBibleStudyStore((s) => s.description);
  const setDescription = useCreateBibleStudyStore((s) => s.setDescription);

  const verses = useCreateBibleStudyStore((s) => s.verses);
  const setVerses = useCreateBibleStudyStore((s) => s.setVerses);

  const collaborators = useCreateBibleStudyStore((s) => s.collaborators);
  const setCollaborators = useCreateBibleStudyStore((s) => s.setCollaborators);

  const visibility = useCreateBibleStudyStore((s) => s.visibility);
  const setVisibility = useCreateBibleStudyStore((s) => s.setVisibility);

  const creator = useCreateBibleStudyStore((s) => s.creator);

  const reset = useCreateBibleStudyStore((s) => s.reset);

  useEffect(() => {
    if (type === "new") reset();
  }, []);

  const [publishing, setPublishing] = useState<boolean>(false);

  // allow user to publish study
  const enablePublish = title && description && content && !publishing;

  const [media, setMedia] = useState<any[]>([]);

  //mutations

  const handleSave = () => {
    // Mock save functionality
    console.log("Saving study...");
  };

  const handlePublish = async () => {
    const { title, topic, description, content, visibility } =
      useCreateBibleStudyStore.getState();
    try {
      setPublishing(true);
      if (type === "new") {
        //create bible study
        const createdStudyId = await createBibleStudy({
          data: {
            title,
            topic,
            description,
            content,
            visibility,
          },
        });

        //add verses
        await addBibleVerses({
          data: verses.map((verse) => {
            return {
              study_id: createdStudyId,
              version: verse.version,
              book: verse.book,
              book_title: verse.book_title || null,
              chapter: verse.chapter,
              verse_start: verse.verse_start,
              verse_end: verse.verse_end,
              verse_text: verse.verse_text,
            };
          }),
        });

        //add collaborators
        await addBibleStudyCollaborators({
          data: collaborators.map((collaborator) => {
            return {
              study_id: createdStudyId,
              user_id: collaborator.user.id,
              role: collaborator.role,
            };
          }),
        });
      } else if (type === "edit") {
        //update
        await updateBibleStudy({
          data: {
            id: study_id || "",
            title,
            topic,
            description,
            content,
            visibility,
          },
        });

        //clear current verses
        await clearBibleVerses({
          data: {
            study_id: study_id || "",
          },
        });
        //insert new verses
        await addBibleVerses({
          data: verses.map((verse) => {
            return {
              study_id: study_id || "",
              version: verse.version,
              book: verse.book,
              book_title: verse.book_title || null,
              chapter: verse.chapter,
              verse_start: verse.verse_start,
              verse_end: verse.verse_end,
              verse_text: verse.verse_text,
            };
          }),
        });

        // collaborators should only be allowed to manage the study details and the verses
        if (creator.id === user?.id) {
          //clear collaborators
          await clearBibleStudyCollaborators({
            data: {
              study_id: study_id || "",
            },
          });
          //add collaborators
          await addBibleStudyCollaborators({
            data: collaborators.map((collaborator) => {
              return {
                study_id: study_id || "",
                user_id: collaborator.user.id,
                role: collaborator.role,
              };
            }),
          });
        }
      }
      setPublishing(false);
      reset();
      if (type === "edit") {
        navigate({
          to: "/study/$studyId",
          params: {
            studyId: study_id || "",
          },
        });
        return;
      }
      navigate({ to: "/study" });
    } catch (error) {
      setPublishing(false);
      console.error(error);
    }
  };

  const visibilityOptions = [
    {
      value: "private" as const,
      icon: Lock,
      label: "Private",
      description: "Only you can see",
    },
    {
      value: "shared" as const,
      icon: Users,
      label: "Shared",
      description: "Collaborators and viewers only",
    },
    {
      value: "public" as const,
      icon: Globe,
      label: "Public",
      description: "Anyone can see",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl mb-2">
          {type === "new" ? "Create" : "Edit"} Bible Study
        </h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Share your insights and discoveries from scripture
        </p>
      </div>

      <div className="space-y-6 md:space-y-8">
        <div className="space-y-4 md:space-y-6 bg-card border border-border rounded-lg p-4 md:p-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm">
              Study Title <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={type === "edit" && creator.id !== user?.id}
              placeholder="Enter a descriptive title for your study"
              className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted disabled:cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="topic" className="block text-sm">
              Topic
            </label>
            <input
              id="topic"
              type="text"
              value={topic || ""}
              onChange={(e) => setTopic(e.target.value)}
              disabled={type === "edit" && creator.id !== user?.id}
              placeholder="e.g., Sermon on the Mount, Psalms, Prayer"
              className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:bg-muted disabled:cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm">
              Description <span className="text-destructive">*</span>
            </label>
            <textarea
              id="description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              disabled={type === "edit" && creator.id !== user?.id}
              placeholder="Brief overview of what this study covers"
              rows={3}
              className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none disabled:bg-muted disabled:cursor-not-allowed"
            />
          </div>
        </div>

        <div className="space-y-3 bg-card border border-border rounded-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg">
            Study Content <span className="text-destructive">*</span>
          </h3>
          <BibleStudyContentEditor
            disabled={!isAuthenticated}
            content={content}
            setContent={setContent}
          />
        </div>

        <div className="space-y-3 bg-card border border-border rounded-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg">Scripture References</h3>
          <p className="text-sm text-muted-foreground">
            Add key verses that support your study
          </p>
          <VerseInput verses={verses} onChange={setVerses} />
        </div>

        {/* <div className="space-y-3 bg-card border border-border rounded-lg p-4 md:p-6">
          <h3 className="text-base md:text-lg">Media & Resources</h3>
          <p className="text-sm text-muted-foreground">
            Add videos, links, or images to enhance your study
          </p>
          <MediaInput media={media} onChange={setMedia} />
        </div> */}

        {/* only show when visibility is not private for the creator, do not show for any other users */}
        {visibility !== "private" &&
          !(type === "edit" && creator.id !== user?.id) && (
            <div className="space-y-3 bg-card border border-border rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg">Viewers</h3>
              <p className="text-sm text-muted-foreground">
                Invite others to view to this study
              </p>
              <CollaboratorInput
                collaborators={collaborators}
                onChange={setCollaborators}
                collaboratorInputRole="viewer"
              />
            </div>
          )}
        {visibility !== "private" &&
          !(type === "edit" && creator.id !== user?.id) && (
            <div className="space-y-3 bg-card border border-border rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg">Collaborators</h3>
              <p className="text-sm text-muted-foreground">
                Invite others to colloaborate on this study
              </p>
              <CollaboratorInput
                collaborators={collaborators}
                onChange={setCollaborators}
                collaboratorInputRole="editor"
              />
            </div>
          )}

        {(type === "new" || (type === "edit" && creator.id === user?.id)) && (
          <div className="space-y-3 bg-card border border-border rounded-lg p-4 md:p-6">
            <h3 className="text-base md:text-lg">Visibility</h3>
            {/* <p className="text-muted-foreground text-xs">
              * feature still under construction (all bible studies will be
              treated as private until feature is completed)
            </p> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {visibilityOptions
                .filter((option) => option.value !== "public")
                .map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setVisibility(option.value)}
                      className={`p-4 border-2 rounded-lg transition-all text-left ${
                        visibility === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 mb-2 ${visibility === option.value ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <div className="font-medium text-sm md:text-base">
                        {option.label}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          {/* <button
            type="button"
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-secondary transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Draft
          </button> */}
          <Button
            disabled={!enablePublish}
            onClick={handlePublish}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3"
          >
            {publishing ? (
              <LoaderCircle className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {type === "new" ? "Publish" : "Update"} Study
          </Button>
        </div>
      </div>
    </div>
  );
}
