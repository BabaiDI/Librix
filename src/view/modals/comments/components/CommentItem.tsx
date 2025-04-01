import { Tables } from "@consts/database.types";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import useProfileAvatar from "@hooks/useProfileAvatar";
import supabase from "@services/supabaseClient";
import { error, profile } from "console";
import { h } from "node_modules/react-router/dist/development/fog-of-war-BALYJxf_.mjs";
import { useEffect, useMemo, useState } from "react";

export type commentsTree = Tables<"commentary"> & {
  profile: Tables<"profile">;
  commentary_action: Tables<"commentary_action">[];
  children?: commentsTree[] | null;
};

interface CommentProps {
  comments: commentsTree[];
  onReply: (comment: commentsTree) => void;
  opensReply: Map<number, boolean>;
  toggleReply: (id: number) => void;
}

export default function CommentItem({ comments, onReply, opensReply, toggleReply }: CommentProps) {
  return (
    <ul className="space-y-6 max-w-2xl">
      {comments.map((comment) => {
        const avatarUrl = useProfileAvatar(comment.profile.id, comment.profile.name);

        return (
          <li key={comment.id} className="border-b pb-2 last:border-none">
            <div className="flex items-start space-x-4">
              <img
                className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center object-cover text-white font-bold"
                src={avatarUrl}
                alt={comment.profile.name}
              />

              <div className="flex-1">
                <div className="flex justify-between gap-4 items-center">
                  <div className="font-semibold text-lg">{comment.profile?.name}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(comment.created_at).toLocaleDateString(navigator.language, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      minute: "2-digit",
                      hour: "2-digit",
                    })}
                  </div>
                </div>

                <p className="mt-2">{comment.content}</p>
              </div>
            </div>

            {comment.children !== null && (
              <button
                onClick={() => {
                  onReply(comment);
                  toggleReply(comment.id);
                }}
                className="mt-3 w-full px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center space-x-2 transition duration-200"
              >
                <span>
                  {opensReply.get(comment.id) ? (
                    <ChevronUpIcon className="size-4" />
                  ) : (
                    <ChevronDownIcon className="size-4" />
                  )}
                </span>
                <span>{opensReply.get(comment.id) ? "Скрыть ответы" : "Показать ответы"}</span>
              </button>
            )}

            {opensReply.get(comment.id) && comment.children && comment.children.length > 0 && (
              <div className="border-l-2 border-gray-300 mt-4 pl-4">
                <CommentItem
                  comments={comment.children}
                  onReply={onReply}
                  opensReply={opensReply}
                  toggleReply={toggleReply}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
