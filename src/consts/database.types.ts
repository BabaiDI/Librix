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
          publisher_id: number | null
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
          publisher_id?: number | null
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
          publisher_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "publisher"
            referencedColumns: ["id"]
          },
        ]
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
          ganre_id: number
        }
        Insert: {
          book_id: number
          ganre_id: number
        }
        Update: {
          book_id?: number
          ganre_id?: number
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
            columns: ["ganre_id"]
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
      book_reviews: {
        Row: {
          book_id: number
          content: string
          created_at: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          book_id: number
          content: string
          created_at?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          book_id?: number
          content?: string
          created_at?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "book_reviews_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reviews_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "page_data_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "book_reviews_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      commentary: {
        Row: {
          book_id: number | null
          content: string
          created_at: string
          id: number
          parent_id: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          book_id?: number | null
          content: string
          created_at?: string
          id?: number
          parent_id?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          book_id?: number | null
          content?: string
          created_at?: string
          id?: number
          parent_id?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commentary_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "book"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commentary_book_id_fkey"
            columns: ["book_id"]
            isOneToOne: false
            referencedRelation: "page_data_books"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commentary_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "commentary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commentary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["id"]
          },
        ]
      }
      commentary_action: {
        Row: {
          action: Database["public"]["Enums"]["commenraty_action"]
          commentary_id: number
          created_at: string
          user_id: string
        }
        Insert: {
          action: Database["public"]["Enums"]["commenraty_action"]
          commentary_id?: number
          created_at?: string
          user_id?: string
        }
        Update: {
          action?: Database["public"]["Enums"]["commenraty_action"]
          commentary_id?: number
          created_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "commentary_action_commentary_id_fkey"
            columns: ["commentary_id"]
            isOneToOne: false
            referencedRelation: "commentary"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commentary_action_user_id_fkey1"
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
      publisher: {
        Row: {
          country: string | null
          created_at: string
          description: string | null
          founded: string | null
          founder: string | null
          headquarters: string | null
          id: number
          logo_url: string | null
          name: string
          website: string | null
        }
        Insert: {
          country?: string | null
          created_at?: string
          description?: string | null
          founded?: string | null
          founder?: string | null
          headquarters?: string | null
          id?: number
          logo_url?: string | null
          name: string
          website?: string | null
        }
        Update: {
          country?: string | null
          created_at?: string
          description?: string | null
          founded?: string | null
          founder?: string | null
          headquarters?: string | null
          id?: number
          logo_url?: string | null
          name?: string
          website?: string | null
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
          publisher_id: number | null
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
          publisher_id?: number | null
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
          publisher_id?: number | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "book_publisher_id_fkey"
            columns: ["publisher_id"]
            isOneToOne: false
            referencedRelation: "publisher"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      get_book_rating_average: {
        Args: {
          book_id: number
        }
        Returns: number
      }
      get_book_rating_count_grouped: {
        Args: {
          book_id: number
        }
        Returns: {
          rating: number
          count: number
        }[]
      }
      get_book_status_count_grouped: {
        Args: {
          book_id: number
        }
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
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
