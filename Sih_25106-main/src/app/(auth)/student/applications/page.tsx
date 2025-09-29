import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {applications} from '@/lib/data';
import Image from 'next/image';
import {Input} from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {ListFilter} from 'lucide-react';
import {format} from 'date-fns';

export default function StudentApplicationsPage() {
  const getBadgeVariant = (
    status: 'Applied' | 'Under Review' | 'Interviewing' | 'Offered' | 'Rejected'
  ) => {
    switch (status) {
      case 'Offered':
        return 'default';
      case 'Interviewing':
        return 'default';
      case 'Under Review':
        return 'secondary';
      case 'Applied':
        return 'outline';
      case 'Rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>
            A list of all the jobs you&apos;ve applied to.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-2 pb-4">
            <Input placeholder="Search applications..." className="max-w-sm" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Applied</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Under Review</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked>Interviewing</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Offered</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Logo</span>
                  </TableHead>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Applied On</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map(app => (
                  <TableRow key={app.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt={`${app.job.company.name} logo`}
                        className="aspect-square rounded-md object-contain"
                        height="48"
                        src={app.job.company.logoUrl}
                        width="48"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{app.job.title}</TableCell>
                    <TableCell>{app.job.company.name}</TableCell>
                    <TableCell>
                      <Badge variant={getBadgeVariant(app.status)}>{app.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {format(new Date(app.appliedDate), 'PPP')}
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
