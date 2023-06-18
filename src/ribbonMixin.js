export default {
    data() {
      return {
        isBold: false,
        isItalic: false,
        isUnderline: false
      };
    },
    computed: {
      textStyle() {
        let style = '';
        if (this.isBold) style += 'font-weight: bold;';
        if (this.isItalic) style += 'font-style: italic;';
        if (this.isUnderline) style += 'text-decoration: underline;';
        return style;
      }
    },
    methods: {
      toggleBold() {
        this.isBold = !this.isBold;
      },
      toggleItalic() {
        this.isItalic = !this.isItalic;
      },
      toggleUnderline() {
        this.isUnderline = !this.isUnderline;
      }
    }
  };
  