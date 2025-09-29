import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Eye, Upload} from 'lucide-react';
import Image from 'next/image';
import {companies} from '@/lib/data';
import Link from 'next/link';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';

export default function RecruiterBrandPage() {
  const company = companies[0];
  const heroImage = PlaceHolderImages.find(p => p.id === 'brand-page-hero');

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Employer Brand Page</CardTitle>
              <CardDescription>
                Customize your company&apos;s page to attract top talent.
              </CardDescription>
            </div>
            <Button asChild variant="outline">
              <Link href={`/c/${company.slug}`} target="_blank">
                <Eye className="mr-2 h-4 w-4" />
                Preview Page
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center gap-4">
                <Label htmlFor="logo">Company Logo</Label>
                <Image
                  src={company.logoUrl}
                  alt="Company Logo"
                  width={128}
                  height={128}
                  className="rounded-lg border bg-muted"
                />
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" /> Change Logo
                </Button>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue={company.name} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Website</Label>
                  <Input id="website" defaultValue={company.website} />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Hero Image</Label>
              {heroImage && (
                <div className="relative h-48 w-full rounded-lg border overflow-hidden">
                  <Image
                    src={heroImage.imageUrl}
                    alt="Hero image"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <Button variant="outline" size="sm" className="w-fit">
                <Upload className="mr-2 h-4 w-4" /> Change Image
              </Button>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea id="description" rows={5} defaultValue={company.description} />
            </div>
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
