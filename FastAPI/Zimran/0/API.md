# API

## Mirrored Text
|   Field    |             Data              |
| ---------- | ----------------------------- |
| **URL**    | http://0.0.0.0:8000/api/text/ |
| **Method** | GET                           |

#### Input
```json
{
  "text": "ABC"
}
```

#### Output
```json
{
	"status": "OK",
	"data": {
		"text": "CBA"
	}
}
```

### Statuses
- SUCCESS: 200
- FAILED: 408 - _timeout_
