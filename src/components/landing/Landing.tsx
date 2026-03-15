import { login } from "#/auth/supabase";
import Button from "#/ui/button/Button";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { BookOpen, FileText, Video, Users } from "lucide-react";

const sampleStudies = [
  {
    id: "1",
    title: "The Beatitudes: Finding Joy in Kingdom Values",
    topic: "Sermon on the Mount",
    author: "Sarah Johnson",
    excerpt:
      "An exploration of Matthew 5:1-12 and what it means to be blessed...",
  },
  {
    id: "2",
    title: "Understanding Grace in Ephesians",
    topic: "New Testament",
    author: "Michael Chen",
    excerpt:
      "A deep dive into Paul's letter and the transformative power of grace...",
  },
  {
    id: "3",
    title: "Psalms for the Weary Soul",
    topic: "Worship & Prayer",
    author: "Emily Rodriguez",
    excerpt:
      "Finding comfort and hope in the Psalms during difficult seasons...",
  },
];

const features = [
  {
    icon: FileText,
    title: "Create Structured Studies",
    description:
      "Write and organize your Bible study content with a rich text editor and clear formatting.",
  },
  {
    icon: BookOpen,
    title: "Add Scripture References",
    description:
      "Include key verses with beautiful formatting that makes scripture stand out.",
  },
  {
    icon: Video,
    title: "Embed Resources",
    description:
      "Add videos, articles, and external resources to enrich your studies.",
  },
  {
    icon: Users,
    title: "Collaborate & Share",
    description:
      "Invite others using @username to co-create studies and share with your community.",
  },
];

export function Landing() {
  const triggerLogin = useServerFn(login);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-primary" />
              <span className="text-xl text-primary">Scripture</span>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={async () => {
                  await triggerLogin();

                  router.invalidate();
                }}
                variant="secondary"
              >
                Sign In
              </Button>
              <Button
                onClick={async () => {
                  await triggerLogin();

                  router.invalidate();
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              Create and Share
              <br />
              <span className="text-primary">Bible Studies</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Write thoughtful studies, organize scripture references, and
              collaborate with others using a platform designed for deep reading
              and spiritual growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                onClick={async () => {
                  await triggerLogin();

                  router.invalidate();
                }}
                className="w-full sm:w-auto px-8 py-3.5 text-lg"
              >
                Get Started Free
              </Button>
              <a
                href="#features"
                className="w-full sm:w-auto px-8 py-3.5 border border-border rounded-lg hover:bg-secondary transition-colors text-lg"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Studies */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Explore Bible Studies</h2>
            <p className="text-lg text-muted-foreground">
              See what others are creating and sharing
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleStudies.map((study) => (
              <div
                key={study.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="inline-block px-2 py-1 bg-accent/70 text-accent-foreground rounded text-sm">
                    {study.topic}
                  </div>
                  <h3 className="text-xl leading-snug">{study.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {study.excerpt}
                  </p>
                  <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground border-t border-border">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs text-accent-foreground">
                      {study.author.charAt(0)}
                    </div>
                    <span>{study.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools for creating meaningful Bible studies
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex gap-4">
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Simple to Get Started</h2>
            <p className="text-lg text-muted-foreground">
              Create your first study in minutes
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                step: "1",
                text: "Create your account and choose a unique @username",
              },
              {
                step: "2",
                text: "Start writing your Bible study with our rich text editor",
              },
              {
                step: "3",
                text: "Add scripture references and helpful resources",
              },
              {
                step: "4",
                text: "Share with others or invite collaborators to contribute",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex items-start gap-4 bg-card border border-border rounded-lg p-6"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
                  {item.step}
                </div>
                <p className="text-lg pt-1.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl">Ready to Begin?</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Join others in creating and sharing meaningful Bible studies
          </p>
          <Button
            onClick={async () => {
              await triggerLogin();

              router.invalidate();
            }}
            className="px-8 py-3.5 text-lg"
          >
            Create Your Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              <span className="text-primary">Scripture</span>
            </div>
            {/* <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div> */}
            <div className="text-sm text-muted-foreground">
              © 2026 Scripture. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
