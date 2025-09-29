import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {MoreHorizontal} from 'lucide-react';
import Image from 'next/image';
import {Progress} from '@/components/ui/progress';

interface Student {
  id: string;
  name: string;
  email: string;
  major: string;
  graduationYear: number;
  applicationCount: number;
  latestApplicationStatus: string | null;
}

interface StudentsTableProps {
  students: Student[];
}

const formatStatus = (status: string | null) => {
  if (!status) return 'No Applications';
  switch (status) {
    case 'APPLIED':
      return 'Applied';
    case 'UNDER_REVIEW':
      return 'Under Review';
    case 'INTERVIEWING':
      return 'Interviewing';
    case 'OFFERED':
      return 'Offered';
    case 'REJECTED':
      return 'Rejected';
    default:
      return status;
  }
};

const getStatusVariant = (status: string | null) => {
  if (!status) return 'secondary';
  switch (status) {
    case 'OFFERED':
      return 'default';
    case 'INTERVIEWING':
      return 'default';
    case 'UNDER_REVIEW':
      return 'secondary';
    case 'REJECTED':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export function StudentsTable({ students }: StudentsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Avatar</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead>Major</TableHead>
            <TableHead className="hidden md:table-cell">Application Status</TableHead>
            <TableHead className="hidden md:table-cell">Grad. Year</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map(student => (
            <TableRow key={student.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Student avatar"
                  className="aspect-square rounded-full object-cover"
                  height="48"
                  src={`https://placehold.co/48x48?text=${student.name.charAt(0)}`}
                  width="48"
                />
              </TableCell>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell className="hidden md:table-cell">{student.email}</TableCell>
              <TableCell>{student.major}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{student.applicationCount} applications</span>
                  </div>
                  <Badge variant={getStatusVariant(student.latestApplicationStatus) as any}>
                    {formatStatus(student.latestApplicationStatus)}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{student.graduationYear}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Send Message</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
