'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { fetchUserAttributes, signOut } from 'aws-amplify/auth';
import { CircleUserRoundIcon, LogOutIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const fetchSession = async (setSession: any) => {
  const user = await fetchUserAttributes();
  setSession(user);
};

export function UserNav() {
  const [session, setSession] : [any, any] = useState({});
  useEffect(() => {
    fetchSession(setSession);
  },[])

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className='flex'>
            <div className="flex flex-col space-y-1 pr-4">
              <p className="text-sm font-medium leading-none">
                {session?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.email}
              </p>
            </div>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <CircleUserRoundIcon className='w-full h-full' />
            </Avatar>
          </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={async () => { await signOut()}}>
            Log out
            <DropdownMenuShortcut><LogOutIcon /></DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
