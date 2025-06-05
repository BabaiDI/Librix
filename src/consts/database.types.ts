export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      author: {
        Row: {
          biography: string | null
          birth_date: string | null
          created_at: string
          death_date: string | null
          first_name: string
          id: number
          image_url: string | null
          last_name: string
          middle_name: string | null
          nationality: string | null
          website: string | null
        }
        Insert: {
          biography?: string | null
          birth_date?: string | null
          created_at?: string
          death_date?: string | null
          first_name: string
          id?: number
          image_url?: string | null
          last_name: string
          middle_name?: string | null
          nationality?: string | null
          website?: string | null
        }
        Update: {
          biography?: string | null
          birth_date?: string | null
          created_at?: string
          death_date?: string | null
          first_name?: string
          id?: number
          image_url?: string | null
          last_name?: string
          middle_name?: string | null
          nationality?: string | null
          website?: string | null
        }
        Relationships: []
      }
      book: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string | null
          id: number
          language: string | null
          pages: number | null
          publish_date: string | null
          publisher_name: string | null
          title: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: number
          language?: string | null
          pages?: number | null
          publish_date?: string | null
          publisher_name?: string | null
          title: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string | null
          id?: number
          language?: string | null
          pages?: number | null
          publish_date?: string | null
          publisher_name?: string | null
          title?: string
        }
        Relationships: []
      }
      book_author: {
        Row: {
          author_id: number
          book_id: number
        }
        Insert: {
          author_id: number
          book_id: number
        }
        Update: {
          author_id?: number
          book_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "book_author_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "author"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_author_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "author_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_author_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_author_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "page_data_books"
            referencedColumns: ["id"]
          },
        ]
      }
      book_genre: {
        Row: {
          book_id: number
          genre_id: number
        }
        Insert: {
          book_id: number
          genre_id: number
        }
        Update: {
          book_id?: number
          genre_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "book_genre_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_genre_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "page_data_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_genre_ganre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genre"
            referencedColumns: ["id"]
          },
        ]
      }
      book_rating: {
        Row: {
          book_id: number
          created_at: string
          rating: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          book_id: number
          created_at?: string
          rating: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          book_id?: number
          created_at?: string
          rating?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_rating_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_rating_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "page_data_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_rating_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      genre: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profile: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          role: Database["public"]["Enums"]["Roles"] | null
          user_id: string
        }
        Insert: {
          role?: Database["public"]["Enums"]["Roles"] | null
          user_id: string
        }
        Update: {
          role?: Database["public"]["Enums"]["Roles"] | null
          user_id?: string
        }
        Relationships: []
      }
      user_book_favorite: {
        Row: {
          book_id: number
          created_at: string
          user_id: string
        }
        Insert: {
          book_id?: number
          created_at?: string
          user_id: string
        }
        Update: {
          book_id?: number
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_book_favorite_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_book_favorite_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "page_data_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_book_favorite_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      user_book_status: {
        Row: {
          book_id: number
          created_at: string
          status: Database["public"]["Enums"]["book_status_enum"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          book_id?: number
          created_at?: string
          status?: Database["public"]["Enums"]["book_status_enum"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          book_id?: number
          created_at?: string
          status?: Database["public"]["Enums"]["book_status_enum"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_book_status_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_book_status_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "page_data_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_book_status_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      author_view: {
        Row: {
          biography: string | null
          birth_date: string | null
          created_at: string | null
          death_date: string | null
          first_name: string | null
          full_name: string | null
          id: number | null
          image_url: string | null
          last_name: string | null
          middle_name: string | null
          nationality: string | null
          website: string | null
        }
        Insert: {
          biography?: string | null
          birth_date?: string | null
          created_at?: string | null
          death_date?: string | null
          first_name?: string | null
          full_name?: never
          id?: number | null
          image_url?: string | null
          last_name?: string | null
          middle_name?: string | null
          nationality?: string | null
          website?: string | null
        }
        Update: {
          biography?: string | null
          birth_date?: string | null
          created_at?: string | null
          death_date?: string | null
          first_name?: string | null
          full_name?: never
          id?: number | null
          image_url?: string | null
          last_name?: string | null
          middle_name?: string | null
          nationality?: string | null
          website?: string | null
        }
        Relationships: []
      }
      page_data_books: {
        Row: {
          average_rating: number | null
          cover_url: string | null
          created_at: string | null
          description: string | null
          id: number | null
          language: string | null
          pages: number | null
          publish_date: string | null
          publisher_name: string | null
          title: string | null
        }
        Insert: {
          average_rating?: never
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: number | null
          language?: string | null
          pages?: number | null
          publish_date?: string | null
          publisher_name?: string | null
          title?: string | null
        }
        Update: {
          average_rating?: never
          cover_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: number | null
          language?: string | null
          pages?: number | null
          publish_date?: string | null
          publisher_name?: string | null
          title?: string | null
        }
        Relationships: []
      }
      unique_languages: {
        Row: {
          language: string | null
        }
        Relationships: []
      }
      unique_nationalities: {
        Row: {
          nationality: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_book_rating_average: {
        Args: { book_id: number }
        Returns: number
      }
      get_book_rating_count_grouped: {
        Args: { book_id: number }
        Returns: {
          rating: number
          count: number
        }[]
      }
      get_book_status_count_grouped: {
        Args: { book_id: number }
        Returns: {
          status: Database["public"]["Enums"]["book_status_enum"]
          count: number
        }[]
      }
    }
    Enums: {
      book_status_enum:
        | "read"
        | "reading"
        | "want to read"
        | "on hold"
        | "dropped"
      commenraty_action: "like" | "dislike"
      Roles: "Admin" | "User"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      book_status_enum: [
        "read",
        "reading",
        "want to read",
        "on hold",
        "dropped",
      ],
      commenraty_action: ["like", "dislike"],
      Roles: ["Admin", "User"],
    },
  },
} as const
