import {companies, jobs} from '@/lib/data';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Globe, MapPin} from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import {Logo} from '@/components/shared/logo';

export default function CompanyPage({params}: {params: {slug: string}}) {
  const company = companies.find(c => c.slug === params.slug);
  const companyJobs = jobs.filter(j => j.company.slug === params.slug);
  const heroImage = PlaceHolderImages.find(p => p.id === 'brand-page-hero');

  if (!company) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="px-4 lg:px-6 h-16 flex items-center border-b">
          <Logo />
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Company Not Found</h1>
            <p className="text-muted-foreground mt-2">
              The company you are looking for does not exist.
            </p>
            <Button asChild className="mt-6">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background">
        <Logo />
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Button asChild>
            <Link href="/role-select">Sign In</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="relative h-64 w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={`${company.name} office`}
              data-ai-hint={heroImage.imageHint}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </section>

        <div className="container -mt-20 px-4 md:px-6">
          <div className="rounded-xl border bg-card text-card-foreground shadow-lg p-6 backdrop-blur-sm bg-background/80">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Image
                src={company.logoUrl}
                alt={`${company.name} logo`}
                width={100}
                height={100}
                className="rounded-md border-2 border-background aspect-square"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold">{company.name}</h1>
                <p className="mt-2 text-muted-foreground max-w-prose">{company.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    <a href={`https://${company.website}`} target="_blank" className="hover:underline">
                      {company.website}
                    </a>
                  </div>
                </div>
              </div>
              <Button size="lg">Follow</Button>
            </div>
          </div>
        </div>

        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6">Open Positions ({companyJobs.length})</h2>
            <div className="grid gap-6">
              {companyJobs.map(job => (
                <Card key={job.id}>
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" /> {job.location}
                      </div>
                      <Badge variant="outline">{job.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {job.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {job.skills.map(skill => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button>Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
