
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface NavigationBarProps {
  onShowInstructions: () => void;
}

const NavigationBar = ({ onShowInstructions }: NavigationBarProps) => {
  return (
    <nav className="bg-black/20 backdrop-blur-lg border-b border-white/10 py-4 px-6 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Vertex Deposit</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <Info className="h-5 w-5 mr-2" />
              Instructions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuItem onClick={onShowInstructions}>
              View Deposit Instructions
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default NavigationBar;
