### ExtractPropTypes
提取prop类型
```javascript
import type { ExtractPropTypes, PropType } from 'vue'
          
const props = {
  person: {
    type: Object as PropType<{ name: string; age: number }>,
    default: {
      name: 'zxc',
      age: 18
    }
  },
  student: {
    type: Object as PropType<{ id: string; score: string }>,
    required: true,
    default: {
      id: '111',
      score: '100'
    }
  }
}
type T = ExtractPropTypes<typeof props>

/**
 * type T = {
    person: {
        name: string;
        age: number;
    };
    student: {
        id: string;
        score: string;
    };
} & {}
*/
```